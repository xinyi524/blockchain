var fundClass = {

	fundsInfo: function ($id, $owner, $state, $type, $balance, $interest, $minDeposit) {

		$id = $id.toString();

		var typeStr = fundTypeToStr($type); //index.js
		var minDepoStr = $minDeposit / (24 * 60 * 60);
		
		var node;

		if ($state == false) {
			typeStr = "closedlist";

			node = document.createElement('div'); // is a node
			node.className = "events_box";
			node.innerHTML =
				'<div class="event_left">' +
				'<div class="event_left-item">' +
				'<div class="icon_2">' +
				'<div class="speaker">' +
				'<i class="fa fa-user"></i>' +
				'<div class="speaker_item">' +
				'<a>' + $id + ' ' + typeStr + '</a>' +
				'</div>' +
				'<div class="clearfix"></div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="event_right">' +
				'<span>Interest: ' + $interest + ', Balance: ' + $balance + ' Wei, Min deposit time: ' + minDepoStr + ' days</span>' +
				'<div class="pull-right">' +
				'<a href="#" class="otherUserInfo" name="' + $owner + '">Info</a>' +
				'</div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
				'<hr>';
		} else {
			node = document.createElement('div'); // is a node
			node.className = "events_box";
			node.innerHTML =
				'<div class="event_left">' +
				'<div class="event_left-item">' +
				'<div class="icon_2">' +
				'<div class="speaker">' +
				'<i class="fa fa-user"></i>' +
				'<div class="speaker_item">' +
				'<a>' + $id + ' ' + typeStr + '</a>' +
				'</div>' +
				'<div class="clearfix"></div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="event_right">' +
				'<span>Interest: ' + $interest + ', Balance: ' + $balance + ' Wei, Require deposit> ' + minDepoStr + ' days</span>' +
				'<div class="pull-right">' +
				'<a href="#" class="otherUserInfo" name="' + $owner + '">Info <strong>|</strong> </a>' +
				'<a href="#" class="invest" name="invest_' + $id + '"> Invest</a>' +
				'</div>' +
				'</div>' +
				'<div class="clearfix"></div>' +
				'<hr>';
		}

		document.getElementById(typeStr).appendChild(node);

		$(".otherUserInfo").click(function (event) {
			document.getElementById("otherUserAddress").innerHTML = event.target.name;

			getOtherAccountInfo(event.target.name);

			$("#userInfo").modal();
		});

		$(".invest").click(function (event) {
			document.getElementById("investFundID").innerHTML = event.target.name.split("_", 2)[1];

			$("#investInfoMod").modal();
		});

	},
};
