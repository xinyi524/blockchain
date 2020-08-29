var MetaAccount;
var myContract;
var users = new Array;
var funds = new Array;
var invests = new Array;
var fundInvestors = new Array;
var blacklist = new Array;

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
	var accountsContractAddress = "0xf5b339d4f163544e1155ca8b71386b3d270766cf";

	MetaAccount = "0x03a32FCeFFF8c7a040CED20a58f249d4B12192a5";

	// Instantiate Contracts
	myContract = new web3.eth.Contract(SuperABI, accountsContractAddress);

	$("#userAddress").html('<li id="userAddress"><a>' + MetaAccount + '<a></li>');

	var accountInterval = setInterval(function () {

		if (ethereum.selectedAddress.toLowerCase() !== MetaAccount.toLowerCase()) {
			alert("Leaving admin page.");
			window.location.href = '../client/index.html';
		}
	}, 1000);
}

function changeEarlyWithdrawFine(newFinePercentage) {
	myContract.methods.getUserNum().call({
			from: ethereum.selectedAddress,
		})
		.catch(console.log);
}



//index
function getSuperInfo() {
	var allFundsNum;
	myContract.methods.Super().call({
			from: ethereum.selectedAddress,
		})
		.then(function (info) {
			$('#superBalance').html("Balance: " + info.superBalance + " Wei");
			$('#fundsNum1').html("Charity Funds: " + info.fundNum1);
			$('#fundsNum2').html("Projects Funds: " + info.fundNum2);
			$('#fundsNum3').html("Institutions Funds: " + info.fundNum3);
			$('#fundsNum4').html("Personal Funds: " + info.fundNum4);
		})
		.catch(console.log);

	myContract.methods.earlyWithdrawal().call({
			from: ethereum.selectedAddress,
		})
		.then(function (info) {
			$('#currentFine').html("Early Withdraw Fine: " + (100 - info) + "%");
		})

	myContract.methods.pendingReturn().call({
			from: ethereum.selectedAddress,
		})
		.then(function (info) {
			$('#pendingReturn').html("Max return pending: " + info / (60 * 60 * 24) + " days");
		})
}

//index
function getUserInfo() {
	myContract.methods.getUserNum().call({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getAccountInfo(i);
			}
		})
		.catch(console.log);
}

//index
function getFundsInfo() {
	myContract.methods.getFundNum().call({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getFundInfo(i);
			}
		})
		.catch(console.log);
}

//index
function getInvestsInfo() {
	myContract.methods.getInvestNum().call({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getInvestInfo(i);
			}
		})
		.catch(console.log);
}

function getWithdrawsInfo() {
	myContract.methods.getWithdrawNum().send({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			for (var i = 0; i < num; i++) {
				getWithdrawInfo(i);
			}
		})
		.catch(console.log);
}

function getAccountInfo(id) {
	myContract.methods.accounts(id).call({
			from: ethereum.selectedAddress,
		})
		.then(function (account) {
			users[id] = account;
			var state;

			var node = document.createElement('li');
			node.id = "address" + account.owner.toLowerCase();
			var blacklistSTR = '<div class="author-box">';

			if (account.blackListID == 0) {
				state = "TRUE";

			} else {
				state = "FALSE";
				blacklistSTR = '<div class="author-box style="style="background-color:Gainsboro ;>';
			}

			node.innerHTML =
				blacklistSTR +
				'<div class="author-box_right" >' +
				'<h5><a>' + account.owner.toLowerCase() + '</a><span class="pull-right"><a class="accountEdit" href="#" name="' + account.owner.toLowerCase() + '">More</a></span></h5>' +
				'<span class="m_1" class="detailes">ID: ' + id + ', State:' + state + ',  Default Times:' + account.defaultCount + '</span>' +
				'<p>Balance: ' + account.accountBalance + ' Wei</p>' +

				'</div>' +
				'<div class="clearfix"> </div>' +
				'</div>';
			document.getElementById("allUsers").appendChild(node);

			$(".accountEdit").click(function (event) {

				var info = document.getElementById("address" + event.target.name).innerHTML;

				document.getElementById("shownInfo").innerHTML = info;

				document.getElementById("fundsOwn").innerHTML = "Own Funds: <br>" + getUserFundsInfo(event.target.name);

				document.getElementById("invested").innerHTML = "Investments: <br>" + getInvestHistory(event.target.name);

				$("#accountInfo").modal();
			});
		})
		.catch(console.log);
}

function getFundInfo(id) {
	myContract.methods.funds(id).call({
			from: ethereum.selectedAddress,
		})
		.then(function (fund) {
			funds[id] = fund;

			var node = document.createElement('li');

			node.className = fundTypeToStr(fund.fundType) + " clearfix";

			node.id = "fund" + id;

			node.innerHTML =
				//owner,state,fundType,interest,fundBalance, defaultCount
				'<div class = "id_col">' + id + '</div>' +
				'<div class = "name_col"><a class = "fundBalance"> ' + fund.fundBalance + '</a></div>' +
				'<div class="duration_col"><a class="fundInterest">' + fund.interest + '</a></div>' +
				'<div class = "date_col pull-right"><a href="#" class="pull-right fundInvestors" id="' + id + '"> More </a></div>';

			document.getElementById("fundInfo").appendChild(node);

			$(".fundInvestors").click(function (event) {
				//owner, state,fundType,interest, fundBalance, defaultCount
				var fundInvest = new Array;
				fundInvest = getFundsInvestors(event.target.id);

				document.getElementById("fundShownID").innerHTML = event.target.id;
				document.getElementById("fundShownInfo").innerHTML = "Owner: " + funds[event.target.id].owner + "<br>Default Times: " + funds[event.target.id].defaultCount;

				$("#investors").empty();
				for (var i = 0; i < fundInvest.length; i++) {
					var node = document.createElement('li');

					node.innerHTML =
						'<li>' + invests[fundInvest[i]].value + ' Wei ' + invests[fundInvest[i]].investor + ' </li>';
					document.getElementById("investors").appendChild(node);
				}

				$("#fundInvestorsInfo").modal();
			});
		})
		.catch(console.log);
}

function getInvestInfo(id) {
	myContract.methods.invests(id).call({
			from: ethereum.selectedAddress,
		})
		.then(function (invest) {
			invests[id] = invest;
			//			console.log(invests);
			//from,to,fromID,toID,value
			var node = document.createElement('li');

			node.className = fundTypeToStr(fund.fundType) + " clearfix";

			node.innerHTML =
				'<div class = "id_col">' + id + '</div>' +
				'<div class="name_col"><a href="#" class="fundInterest">' + invest.fundID + ' <strong>/</strong> </a><a>' + invest.investor.toLowerCase() + ' </a></div>' +
				'<div class = "duration_col"><a class = "fundBalance"> ' + invest.value + '</a></div>' +
				'<div class = "date_col pull-right">' + timeConverter(invest.date) + '</div>';
			document.getElementById("investInfo").appendChild(node);
		})
		.catch(console.log);
}

function getWithdrawInfo(id) {
	myContract.methods.withdraws().call({
			from: ethereum.selectedAddress,
		})
		.then(function (withdraw) {
			var node = document.createElement('li');

			node.className = "clearfix";

			node.id = "withdraw" + id;

			node.innerHTML =
				'<div class = "id_col">' + id + '</div>' +
				'<div class = "name_col"><a class = "fundBalance"> ' + withdraw.user + '</a></div>' +
				'<div class="duration_col"><a class="fundInterest">' + withdraw.value + '</a></div>' +
				'<div class = "date_col pull-right"><a href="#" class="pull-right withdrawSubmit" name="' + id + '_' + withdraw.value + '">Submit</a></div>';
			document.getElementById("fundInfo").appendChild(node);

			$(".withdrawSubmit").click(function (event) {
				withdraw(event.target.name);
			});
		})
		.catch(console.log);
}

function withdraw(idANDvalue) {
	var id = idANDvalue.split("_", 2)[0];
	var value = idANDvalue.split("_", 2)[1];

	alert("Withdraw ID: " + id + ", value: " + value + "......");

	myContract.methods._withdraw().send({
		from: ethereum.selectedAddress,
		gas: 3000000,
		value: value
	}, function (err, res) {
		if (err == null) {
			alert("Withdraw successfully!");
		} else
			alert("Withdraw failed");
		console.log(err);
		console.log(res);
	});
}

function getUserFundsInfo(user) {
	var temp = "";
	for (var i = 0; i < funds.length; i++) {
		if (funds[i][0].toLowerCase() === user.toLowerCase()) {
			temp += i + ", ";
		}
	}
	return temp;
}


function getInvestHistory(user) {
	var temp = "";
	for (var i = 0; i < invests.length; i++) {
		if (invests[i].investor.toLowerCase() === user.toLowerCase()) {
			temp += "Fund: " + invests[i].fundID + ", " + invests[i].value + "Wei Date:" + timeConverter(invests[i].date) + "<br>";
		}
	}
	return temp;
}




function changeDefaultCount(fundID, addORsub) {
	myContract.methods.changeDefaultCount(fundID, addORsub).call({
			from: ethereum.selectedAddress,
		})
		.then(function (num) {
			alert("Funder default: "+num.accountDefaultCount+"<br> Fund Default: "+num.fundDefaultCount);
		});
}

function getFundsInvestors(_fundID) {
	var fundInvest = new Array();
	for (var i = 0; i < invests.length; i++) {
		if (invests[i].fundID == _fundID) {
			fundInvest.push(i);
		}
	}
	return fundInvest;
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
