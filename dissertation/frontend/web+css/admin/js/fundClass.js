var fundClass = {

	fundsInfo: function ($id, $owner, $state, $type, $balance, $interest) {

		console.log($id, $owner, $state, $type, $balance, $interest);

		$id = $id.toString();

		var typeStr = fundTypeToStr($type); //index.js

		if ($state == false) {
			typeStr = "closedlist";
		}

		var node = document.createElement('div'); // is a node
		node.innerHTML =
			'<div class="events_box">' +
			'<div class="event_left">' +
			'<div class="event_left-item">' +
			'<div class="icon_2">' +
			'<div class="speaker">' +
			'<i class="fa fa-user"></i>' +
			'<div class="speaker_item">' +
			'<a href="#">' + $id + ' ' + typeStr + '</a>' +
			'</div>' +
			'<div class="clearfix"></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<div class="event_right">' +
			'<span>Interest: ' + $interest + ' Balance: ' + $balance + ' Wei</span>' +
			'<div class="pull-right">' +
			'<a href="#" class="otherUserInfo" name="' + $owner + '">Information <strong>|</strong> </a>' +
			'<a href="#" class="invest" name="' + $id + '"> Invest</a>' +
			'</div>' +
			'</div>' +
			'<div class="clearfix"></div>' +
			'</div>' +
			'<hr>';

		document.getElementById(typeStr).appendChild(node);

		$(".otherUserInfo").click(function (event) {
			document.getElementById("otherUserAddress").innerHTML = event.target.name;

			getOtherAccountInfo(event.target.name);

			$("#userInfo").modal();
		});

		$(".invest").click(function (event) {
			document.getElementById("investFundID").innerHTML = event.target.name;

			$("#investInfo").modal();
		});

	},
};
