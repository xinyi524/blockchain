$(document).ready(function () {
	setTimeout(getInfo, 1000);

	$(".index").show();
	$(".ownAccountInfo").hide();

	$(".viewAccount").click(function () {
		$(".ownAccountInfo").show();
		$(".index").hide();

		$(".pageTitle").html('Information');
		$(".current-page").html('<li class="current-page">Information</li>');

		getOwnAccount();
	});

	$(".changeBalance").click(function () {
		$("#topupORwithdraw").modal();
	});


	$("#investValueSubmit").click(function () {
		var fundID = document.getElementById("investFundID").innerHTML;
		var value = document.getElementById("investValue").value;

		invest(fundID, value);
	});

	//	topup or withdraw
	$("#balanceChangeSubmit").click(function () {
		var tORw = $("#tORw").val();
		var value = $("#changeValue").val();
		if (tORw == 't') {
			userTopup(value);
		} else {
			userWithdraw(value);
		}
	});

	$("#fundConfirm").click(function () {
		var interest = $("#newFundInterest").val();
		var type = $("#newFundType").val();

		newFund(interest, type);
	});

	//	************************************************

	$("#paybackValueSubmit").click(function () {
		payFund($("#paybackValue").val());

	});

	$("#fundCloseSubmit").click(function () {

	});

	$("#investWithdrawValueSubmit").click(function () {
		investWithdrawValue
	});

	$(".dropdown").hover(
		function () {
			$('.dropdown-menu', this).stop(true, true).slideDown("fast");
			$(this).toggleClass('open');
		},
		function () {
			$('.dropdown-menu', this).stop(true, true).slideUp("fast");
			$(this).toggleClass('open');
		}
	);

	/* ---- Animations ---- */

	$('#links a').hover(
		function () {
			$(this).animate({
				left: 3
			}, 'fast');
		},
		function () {
			$(this).animate({
				left: 0
			}, 'fast');
		}
	);

	$('footer a').hover(
		function () {
			$(this).animate({
				top: 3
			}, 'fast');
		},
		function () {
			$(this).animate({
				top: 0
			}, 'fast');
		}
	);

});
