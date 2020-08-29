var MetaAccount;
var myContract;
var superAddress;
var allFunds = new Array;
var ownInvests = new Array;
var ownFundID = new Array;

window.addEventListener('load', function () {

	// Checking if Web3 has been injected by the browser (Mist/MetaMask)

	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		web3 = new Web3(web3.currentProvider);
	} else {
		console.log('No web3? You should consider trying MetaMask!');
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}

	web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

	// Now you can start your app & accesss web3 freely:

	startApp();
});

function startApp() {
	//////////////////////////////////////////
	myContractAddress2 = "0x40c7b1885d5df8be83600c995a85ee3166170b12";
	myContractAddress3 = "0x85ef30900fce9e0ef448fdc9264a68102c026fd3";
	myContractAddress4 = "0x4351be3cf6ede3ab62198a9c6d384fea6f36bbec";
	//0xccd07704138e7657c989cdd3890a92ba2be13768
	//0xe37aea1316fe7a201af9bb5965af7d25dfaecae8

	account2 = "0x2342f5d8cAaE2cA6292CD18D6B8de8a39d13ACbD";
	account3 = "0x3db82068533Cc8601032c74B46cBf34c517C48fb";
	account4 = "0x8ea165f0947538a26190ae3508BDda0Cfc15f7a5";

	// Instantiate Contracts
	myContract = new web3.eth.Contract(UserABI, myContractAddress2);

	myContract.methods.superAddress().call()
		.then(function (address) {
			superAddress = address.toLowerCase();
		});


	var accountInterval = setInterval(function () {
		if (ethereum.selectedAddress !== MetaAccount) {
			MetaAccount = ethereum.selectedAddress;

			$("#userAddress").html('<li id="userAddress"><a>' + MetaAccount + '<a></li>');
			if (ethereum.selectedAddress == account2.toLowerCase()) {
				myContract = new web3.eth.Contract(UserABI, myContractAddress2);
			} else if (ethereum.selectedAddress == account3.toLowerCase()) {
				myContract = new web3.eth.Contract(UserABI, myContractAddress3);
			} else if (ethereum.selectedAddress == account4.toLowerCase()) {
				myContract = new web3.eth.Contract(UserABI, myContractAddress4);
			}
		}
		if (ethereum.selectedAddress == superAddress) {
			window.location.href = '../admin/admin.html';
		}
	}, 1000);
}

//index
function getSuperInfo() {
	myContract.methods.getSuperInfo().call({})
		.then(function (info) {
			$('#superBalance').html(info.superBalance + " Wei");
			$('#fundsNum1').html(info.fundsNum1);
			$('#fundsNum2').html(info.fundsNum2);
			$('#fundsNum3').html(info.fundsNum3);
			$('#fundsNum4').html(info.fundsNum4);
		})
		.catch(console.log);
}

//*****************************************************
function getFundsInfo() {
	myContract.methods.getFundNum().call({})
		.then(function (num) {
			for (var i = 0; i < num; i++) {
				getFundDetail(i);
			}
		console.log(allFunds);
		})
		.catch(console.log);
}

function getFundDetail(fundId) {
	myContract.methods.getFundInfo(fundId).call({
			from: MetaAccount,
		})
		.then(function (fund) {
			allFunds[fundId] = fund;
		})
}
//***************************************************

function getOwnAccount() {
	myContract.methods.getOwnAccount().call({
			from: ethereum.selectedAddress,
		})
		.then(function (account) {
			var state;
			if (account.blackListID == 0) {
				state = "TRUE";
			} else
				state = "BLACKLISTED";

			$("#accountState").html(
				'<p id="accountState">' + state + '</p>');
			$("#accountBalance").html(
				'<p id="accountBalance">' + account.balance + '</p>');
			$("#accountDefaultCount").html(
				'<p id="accountDefaultCount">' + account.defaultCount + '</p>');

			ownFundID = account.fundsID;
			console.log("Own funding: " + ownFundID);
			for (var i = 0; i < account.investID.length; i++) {
				getInvestInfo(i, account.investID[i]);
			}

			console.log("Own investment: " + account.investID);
		})
		.catch(console.log);
}

function getInvestInfo(i, _investID) {
	myContract.methods.getInvestInfo(_investID).call({
			from: ethereum.selectedAddress
		})
		.then(function (invest) {
			ownInvests[i] = invest;
		})
		.catch(console.log);
}

//need time between each topup
function userTopup(_value) {
	myContract.methods.userTopup().send({
		from: ethereum.selectedAddress,
		gas: 3000000,
		value: _value
	}, function (err, res) {
		if (err == null) {
			alert("Topup successfully!");
		}
		console.log(err);
		console.log(res);
	});
}

//************************************************

function getOwnFundPendingReturn() {
	for (var i = 0; i < ownFundID.length; i++) {
		myContract.methods.getFundPendings(ownFundID[i]).call({
				from: ethereum.selectedAddress
			})
			.then(function (pendingID) {
				console.log("pending ID: " + pendingID);
				for (var i = 0; i < pendingID.length; i++) {
					pendingInfo(pendingID[i]);
				}
			})
			.catch(console.log);
	}
}

function pendingInfo(pendingID) {
	myContract.methods.getPendingInfo(pendingID).call()
		.then(function (pending) {
			var pendingID = pending.fundID;
			var node = document.createElement('tr');

			node.innerHTML =
				'<th scope="row"><a href = "#" class = "pendingFundID" name = "' + pending.fundID + '">' + pending.fundID + '</a></th>' +
				'<td>' + pending.value + ' Wei</td>' +
				'<td>' + timeConverter(pending.requiredDate) + '</td>' +
				'<td><a href = "#" class = "returnPending" name = "'+pending.value+'">Return</></td>';
			document.getElementById("investInfo").appendChild(node);

			$(".returnPending").click(function (event) {
				document.getElementById("pendingValue").innerHTML = event.target.name;
				$("#returnFundPending").modal();
			});

		})
		.catch(console.log);
}

function returnFundPending(pendingID, value) {
	myContract.methods.getPendingInfo(pendingID).send({
			from: ethereum.selectedAddress,
			value: value
		})
		.then(function (result) {
			alert(result);
		})
		.catch(console.log);
}
//**************************************************

//index, list
function getOtherAccountInfo(_userID) {
	myContract.methods.getOtherAccountInfo(_userID).call()
		.then(function (account) {
			//display others account
			$("#accountState").html("Account State: " + account.state);
			$("#defaultCount").html("Default Count: " + account.defaultCount);
		})
}

//gas200000,out of gas
function invest(_fundID, _value) {
	alert(_fundID +" "+ _value);
	myContract.methods.invest(_fundID, _value).send({
			from: ethereum.selectedAddress,
			gas: 4000000
		})
		.then(function (result) {
		if(result.succuess==true){
			alert("succeed!");
		}
		else if(result.succuess==false){
			alert("failed!");
		}
		});
}

//newfund
function newFund(_interest, _type, _minDeposit) {
	myContract.methods.newFund(_interest, _type, _minDeposit * 24 * 60 * 60).send({
		from: ethereum.selectedAddress,
		gas: 300000
	}, function (err, res) {
		if (err == null) {
			alert("Succeed!");
		}
		console.log(err);
		console.log(res);
	});
}

//ownAccountInfo
function changeFundState(_fundID) {
	alert("Changeing state of fund " + _fundID + "......");
	myContract.methods.changeFundState(_fundID).send({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			if (result == null) {
				alert("Change state failed");
			} else {
				alert("Successfully change fund " + _fundID + " state");
			}
		})
}

///////////////////////////////////////////////////
function changeFundDepositTime(fundID, time) {
	myContract.methods.changeFundDepositTime(fundID, time).send({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			if (result == null) {
				alert("Change Fund Deposit Time failed");
			} else {
				alert("Successfully changes fund " + fundID + " Deposit Time");
			}
		})
}

/////////////////////////////topup money
function withdraw(_value) {
	myContract.methods.withdraw(_value).call({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			if (result == true) {
				alert('Withdraw ' + _value + ' pending......');
			}
		});
}

function deleteFund(_fundID){
	myContract.methods.deleteOwnFund(_fundID).call({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			alert("deleted");
		});
}


/////////////////////////////from invest
function returnOnInvest(_investID, _value) {
	console.log(_investID + " " + _value);
	myContract.methods.requestReturnInvest(_investID, _value).call({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			alert(result);
		})
}

function fundTypeToStr(_type) {
	switch (parseInt(_type)) {
		case 1:
			return "charity";
		case 2:
			return "projects";
		case 3:
			return "institution";
		case 4:
			return "personal";
	}
}

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 11, 12];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}
