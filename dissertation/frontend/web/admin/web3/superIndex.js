var MetaAccount;
var myContract;
var users = new Array;
var funds = new Array;
var invests = new Array;
var fundInvestors = new Array;

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
	var accountsContractAddress = "0xb3ff9ed6c2b110002c9306c301dcc2282e635751";

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

//index
function getUserInfo() {
	myContract.methods.getUserNum().call({})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getAccountInfo(i);
			}
		})
		.catch(console.log);
}

//index
function getSuperInfo() {
	var allFundsNum;
	myContract.methods.Super().call({})
		.then(function (info) {
			$('#superBalance').html("Balance: " + info.superBalance + " Wei");
			$('#fundsNum1').html("Charity Funds: " + info.fundNum1);
			$('#fundsNum2').html("Projects Funds: " + info.fundNum2);
			$('#fundsNum3').html("Institutions Funds: " + info.fundNum3);
			$('#fundsNum4').html("Personal Funds: " + info.fundNum4);
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
	myContract.methods.getInvestNum().call({})
		.then(function (num) {
			//index
			for (var i = 0; i < num; i++) {
				getInvestInfo(i);
			}
		})
		.catch(console.log);
}

function changeState(user) {
	myContract.methods.changeState(user).send({
			from: ethereum.selectedAddress,
			gas: 200000
		})
		.then(function (newState) {
			alert("Change address: " + user + " state to " + newState.state);
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


function getAccountInfo(id) {
	myContract.methods.accounts(id).call({
			from: ethereum.selectedAddress,
		})
		.then(function (account) {
			users[id] = account;
			//						console.log(account);
			//owner, state, accountBalance, defaultCount
			var node = document.createElement('li');
			node.id = "address" + account.owner.toLowerCase();
			node.innerHTML =
				'<div class="author-box">' +
				'<div class="author-box_right" >' +
				'<h5><a>' + account.owner.toLowerCase() + '</a><span class="pull-right"><a class="accountEdit" href="#" name="' + account.owner.toLowerCase() + '">More</a></span></h5>' +
				'<span class="m_1" class="detailes">ID: ' + id + ', State:' + account.state + ',  Default Times:' + account.defaultCount + '</span>' + '<span class="pull-right"><a href="#" class="changeState" id="' + account.owner.toLowerCase() + '">Change State</a></span>' +
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

			$(".changeState").click(function (event) {
				changeState(event.target.id);
			});

		});
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
				var fundInvest = getFundsInvestors(event.target.id);

				document.getElementById("fundShownInfo").innerHTML = "FundID: " + event.target.id;

				$("#investors").empty();
				for (var i = 0; i < fundInvest.length; i++) {
					var node = document.createElement('li');

					node.innerHTML =
						'<li>' + fundInvest[i].value + ' Wei ' + fundInvest[i].investor + ' </li>';
					document.getElementById("investors").appendChild(node);
				}

				$("#fundInvestorsInfo").modal();
			});

			$(".close").click(function () {

				//$("#moreFundInfo").modal();
			});
		});

}

function getFundsInvestors(_fundID) {
	var fundInvest = new Array();
	for (var i = 0; i < invests.length; i++) {
		if (invests[i].fundID == _fundID) {
			fundInvestors.push(i);
		}
	}
	return fundInvest;
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

			$(".close").click(function () {

				//$("#moreFundInfo").modal();
			});
		});
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
