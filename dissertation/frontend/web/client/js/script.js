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
		getInvestHistory();
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
			withdraw(value);
		}
	});

	$("#fundConfirm").click(function () {
		var interest = $("#newFundInterest").val();
		var type = $("#newFundType").val();
		var minDeposit = $("#minDeposit").val();

		newFund(interest, type, minDeposit);
	});
	
	$("#investWithdrawValueSubmit").click(function () {
		var value = $("#investWithdrawValue").val();
		var investID = $("#investWithdrawFundID").val();

		returnOnInvest(investID, value);
	});

	$("#historySearchSubmit").click(function () {
		$('#fundInfo').hide();
		$('#investInfo').hide();

		var iORf = $("#historyType").val();
		var type = $("#fundsType").val();

		if (iORf == "invest") {
			$('#investInfo').show();
			$('#fundInfo').hide();
		} else if (iORf == "fund") {
			$('#fundInfo').show();
			$('#investInfo').hide();
		} else {
			$('#fundInfo').show();
			$('#investInfo').show();
		}
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
