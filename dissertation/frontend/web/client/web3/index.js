var MetaAccount;
var myContract;
var superAddress;
var allFunds = new Array;
var ownInvests = new Array;

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
	//use when deploy
	//	var accountsContractAddress = "0x2610ad99211a732170921f98047cb2e5cdcf1f73";

	myContractAddress = "0x8cff751ce2eb26e079c2dbc6ce94cd4afcdf0afa";
	//	"0x8bef04fbb9ef906372fc9c3b3e79c052364195f4";
	//		

	//address = 0x2342f5d8cAaE2cA6292CD18D6B8de8a39d13ACbD

	// Simply encoding
	//	myContract.deploy({
	//			data: userBytecode,
	//			arguments: [accountsContractAddress]
	//		})
	//		.encodeABI();

	// Instantiate Contracts
	myContract = new web3.eth.Contract(UserABI, myContractAddress);

	myContract.methods.superAddress().call()
		.then(function (address) {
			superAddress = address.toLowerCase();
		});


	var accountInterval = setInterval(function () {
		if (ethereum.selectedAddress !== MetaAccount) {
			MetaAccount = ethereum.selectedAddress;

			$("#userAddress").html('<li id="userAddress"><a>' + MetaAccount + '<a></li>');
		}
		if (ethereum.selectedAddress == superAddress) {
			window.location.href = '../admin/admin.html';
		}
	}, 1000);

}

//index
function getInfo() {
	var allFundsNum;
	myContract.methods.getSuperInfo().call({})
		.then(function (info) {
			$('#superBalance').html(info.superBalance + " Wei");
			$('#fundsNum1').html(info.fundsNum1);
			$('#fundsNum2').html(info.fundsNum2);
			$('#fundsNum3').html(info.fundsNum3);
			$('#fundsNum4').html(info.fundsNum4);

			getFundsInfo();
		})
		.catch(console.log);
}

//*****************************************************
function getFundsInfo() {
	myContract.methods.getFundNum().call({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getFundDetail(i);
			}
		})
		.catch(console.log);
}

function getFundDetail(id) {
	myContract.methods.getFundInfo(id).call({
			from: MetaAccount,
		})
		.then(function (fund) {
			allFunds[id] = fund;

			var temp = fundClass.fundsInfo(fund.id, fund.owner, fund.state, fund.accountType, fund.balance, fund.interest, fund.minDeposit);
		})
}
//***************************************************

function getOwnAccount() {
	myContract.methods.getOwnAccount().call({
			from: ethereum.selectedAddress,
		})
		.then(function (account) {
			$("#accountState").html(
				'<p id="accountState">' + account.state + '</p>');
			$("#accountBalance").html(
				'<p id="accountBalance">' + account.balance + '</p>');
			$("#accountDefaultCount").html(
				'<p id="accountDefaultCount">' + account.defaultCount + '</p>');

			for (var i = 0; i < account.fundsID.length; i++) {

				var fundID = account.fundsID[i];

				var node = document.createElement('li');
				node.className = "clearfix";

				node.innerHTML =
					'<div class = "id_col">' + allFunds[fundID].id + '</div>' +
					'<div class = "name_col"><span id="fundState_' + fundID + '">' + allFunds[fundID].state + ' | </span><a href="#" class = "changeDeposit" id="deposit_' + allFunds[fundID].id + '"> Change deposit time | </a><a href="#" class="changeFundState" id="changeState_' + allFunds[fundID].id + '">Change state | </a><a href="#" class="deleteFund" id="deleteFund_' + allFunds[fundID].id + '">Delete | </a><a href="#" class="depositTime" id="deposotTime_' + allFunds[fundID].id + '">Deposit>' + (allFunds[fundID].minDeposit) / (60 * 60 * 24) + ' days</a> </div>' +
					'<div class = "duration_col fundBalance">' + allFunds[fundID].balance + ' Wei</div>' +

					'<div class="date_col fundInterest">' + allFunds[fundID].interest + '</div>';
				document.getElementById("ownFundInfo").appendChild(node);

				$(".changeDeposit").click(function (event) {
					document.getElementById("changeFundMinDepositFundID").innerHTML = "Fund ID: " + event.target.id.split("_", 2)[1];
					$("#changeFundMinDepositMod").modal();
				});

				$(".changeFundState").click(function (event) {
					changeFundState(event.target.id.split("_", 2)[1]);
				});

				$(".deleteFund").click(function (event) {
					document.getElementById("closeFundID").innerHTML = "Fund ID: " + event.target.id.split("_", 2)[1];
					$("#fundCloseMod").modal();
				});
			}
		})
		.catch(console.log);
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

//**************************************************
function getInvestHistory() {
	myContract.methods.getInvestHistoryID().call({
			from: ethereum.selectedAddress
		})
		.then(function (id) {
			for (var i = 0; i < id.length; i++) {
				getInvestInfo(i);
			}
		})
}

function getInvestInfo(id) {
	myContract.methods.getInvestHistory(id).call({
			from: ethereum.selectedAddress
		})
		.then(function (invest) {
			ownInvests[id] = invest;
			console.log(ownInvests);

			var node = document.createElement('li');
			node.className = "clearfix";

			node.innerHTML =
				'<div class = "id_col"><a class = "fundInfo">' + invest._fundID + '</a></div>' +
				'<div class="name_col">' + timeConverter(invest._time) + '</div>' +
				'<div class = "date_col"><a href="#" class="investWithdraw" id="returnOnInvest_' + id + '">Withdraw</a></div>' +
				'<div class = "duration_col">' + invest._value + ' Wei</div>';
			document.getElementById("investInfo").appendChild(node);

//			$(".fundInfo").click(function (event) {
//				console.log(event.target.innerHTML);
//				var fundID = ownInvests[event.target.innerHTML]._fundID;
//
//				document.getElementById("fundInfoID").innerHTML = "FundID: "+fundID;
//
//				document.getElementById("fundOwner").innerHTML = allFunds[fundID].owner;
//
//				document.getElementById("fundState").innerHTML = allFunds[fundID].state;
//
//				document.getElementById("fundBalance").innerHTML = allFunds[fundID].balance;
//
//				document.getElementById("minDeposit").innerHTML = allFunds[fundID].minDeposit;
//				$("#fundInfoMod").modal();
//			});

			$(".investWithdraw").click(function (event) {
				document.getElementById("investWithdrawFundID").innerHTML = "FundsID: " + event.target.id.split("_", 2)[1];

				$("#investWithdrawMod").modal();
			});

		})
}
//************************************************

//index, list
function getOtherAccountInfo(_userID) {
	myContract.methods.getOtherAccountInfo(_userID).call()
		.then(function (account) {
			//display others account info.php
			$("#accountState").html("Account State: " + account.state);
			$("#defaultCount").html("Default Count: " + account.defaultCount);
		})
}


//gas200000,out of gas
function invest(_fundID, _value) {
	alert(_fundID + _value);
	myContract.methods.invest(_fundID, _value).send({
			from: ethereum.selectedAddress,
			gas: 300000
		})
		.then(function (result) {
			alert('Invest succeed!');
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
				alert("Successfully change fund " + _fundID + " state into " + result.state);

				document.getElementById("fundState_" + _fundID).innerHTML = result.state;
			}
		})
}

/////////////////////////////topup money
function withdraw(_value) {
	myContract.methods.withdraw(_value).call({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			alert('Withdraw ' + result.success);
		});
}

/////////////////////////////from invest
function returnOnInvest(_investID, _value) {
	myContract.methods.returnOnInvest(_investID, _value).call({
			from: ethereum.selectedAddress
		})
		.then(function (result) {
			alert(result);
		})
}



function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}
