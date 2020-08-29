function showAllFunds() {
	for (var i = 0; i < allFunds.length; i++) {
		var fundID = i;
		var node = document.createElement('tr');
		var typeStr = fundTypeToStr(allFunds[i].fundType); //index.js
		var minDepoStr = allFunds[i].minDeposit / (24 * 60 * 60);

		if (allFunds[i].state == false) {
			typeStr = "closedlist";
			node.innerHTML =
				'<th scope="row"><a href = "#" class = "infoOfFundID" name = "' + i + '">' + i + '</a></th>' +
				'<td>' + typeStr + '</td>' +
				'<td>' + allFunds[i].interest + '</td>' +
				'<td>' + allFunds[i].balance + ' Wei</td>' +
				'<td>' + minDepoStr + ' Days</td>' +
				'<td><a href="#" class="otherUserInfo" name="' + allFunds[i].owner + '">Info</a> +</td>';
		} else {
			node.innerHTML =
				'<th scope="row"><a href = "#" class = "infoOfFundID" name = "' + i + '">' + i + '</a></th>' +
				'<td>' + typeStr + '</td>' +
				'<td>' + allFunds[i].interest + '</td>' +
				'<td>' + allFunds[i].balance + ' Wei</td>' +
				'<td>' + minDepoStr + ' Days</td>' +
				'<td><a href="#" class="otherUserInfo" name="' + allFunds[i].owner + '">Info <strong>|</strong> </a>' +
				'<a href="#" class="invest" name="' + i + '"> Invest</a></td>';
		}

		document.getElementById(typeStr).appendChild(node);

		$(".otherUserInfo").click(function (event) {
			document.getElementById("otherUserAddress").innerHTML = event.target.name;

			getOtherAccountInfo(event.target.name);

			$("#userInfo").modal();
		});

		$(".invest").click(function (event) {
			document.getElementById("investFundID").innerHTML = event.target.name;

			$("#investInfoMod").modal();
		});
	}
}

function showOwnFunds() {
	for (var i = 0; i < ownFundID.length; i++) {
		var fundID = ownFundID[i];
		var node = document.createElement('tr');
		node.id = "fund_" + ownFundID[i];
		node.innerHTML =
			'<th scope="row">' + fundID + '</th>' +
			'<td><a href = "#" class = "changeFundState" name="' + fundID + '">' + allFunds[fundID].state + '</td>' +
			'<td>' + allFunds[fundID].balance + ' Wei</td>' +
			'<td><a href = "#" class = "changeDeposit" name="' + fundID + '">' + (allFunds[fundID].minDeposit) / (60 * 60 * 24) + ' days</a></td>' +
			'<td>' + allFunds[fundID].interest + '</td>' +
			'<td><a href = "#" class = "deleteFund" name="' + fundID + '">Delete</></td>';

		document.getElementById("ownFundInfo").appendChild(node);

		$(".changeDeposit").click(function (event) {
			document.getElementById("changeMinDepositFundID").innerHTML = event.target.name;
			$("#changeFundMinDepositMod").modal();
		});

		$(".changeFundState").click(function (event) {
			document.getElementById("changeStateFundID").innerHTML = event.target.name;
			$("#changeFundStateMod").modal();
		});

		$(".deleteFund").click(function (event) {
			document.getElementById("deleteFundID").innerHTML = event.target.name;
			$("#fundDeleteMod").modal();
		});
	}
}

function showOwnInvests() {
	for (var i = 0; i < ownInvests.length; i++) {
		var fundID = ownInvests[i].fundID;
		var node = document.createElement('tr');

		node.innerHTML =
			'<th scope="row"><a href = "#" class = "infoOfFundID" name = "' + ownInvests[i]._fundID + '">' + ownInvests[i]._fundID + '</a></th>' +
			'<td>' + ownInvests[i]._value + ' Wei</td>' +
			'<td>' + timeConverter(ownInvests[i]._date) + '</td>' +
			'<td><a href = "#" class = "withdrawInvest" name = "' + ownInvests[i]._fundID + '">Withdraw</></td>';
		document.getElementById("investInfo").appendChild(node);

		$(".infoOfFundID").click(function (event) {
			var fundID = event.target.name;

			document.getElementById("fundInfoID").innerHTML = fundID;
			document.getElementById("funderAddress").innerHTML = allFunds[fundID].owner;
			document.getElementById("fundBalance").innerHTML = allFunds[fundID].balance;
			document.getElementById("fundDefaultTime").innerHTML = allFunds[fundID].defaultCount;

			$("#fundInfo").modal();
		});
		$(".withdrawInvest").click(function (event) {
			document.getElementById("investWithdrawFundID").innerHTML = event.target.name;

			$("#investWithdrawMod").modal();
		});
	}
}
