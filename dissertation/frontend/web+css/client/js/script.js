$(document).ready(function () {
	setTimeout(getSuperInfo, 1000);
	setTimeout(getFundsInfo, 1000);
	setTimeout(getOwnAccount, 1000);
	setTimeout(getOwnFundPendingReturn, 1500);
	setTimeout(showAllFunds, 1500);
	
	
//	$(".index").show();
//	$(".ownAccountInfo").hide();

//	$(".viewAccount").click(function () {
//		$(".ownAccountInfo").show();
//		$(".index").hide();
//
//		$(".pageTitle").html('Information');
//		$(".current-page").html('<li class="current-page">Information</li>');
//		
//		getOwnAccount();
//		getInvestHistory();
//		getOwnFundPendingReturn();
//	});

	$(".showOwnInfo").click(function () {
		showOwnFunds();
		showOwnInvests();
	});
	
	$(".changeBalance").click(function () {
		$("#topupORwithdraw").modal();
	});
	
	$(".FundMinDepositSubmit").click(function () {
		var newTime = document.getElementById("newDepositTime").innerHTML;
		var fundID = document.getElementById("changeFundMinDepositFundID").innerHTML;
		changeFundDepositTime(fundID)
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

	$("#changeFundStateSubmit").click(function () {
		var fundID = document.getElementById("changeStateFundID").innerHTML;
		changeFundState(fundID);
	});
	
	$("#fundDeleteSubmit").click(function () {
		var fundID = document.getElementById("deleteFundID").innerHTML;

		deleteFund(fundID);
	});
	
	$("#fundConfirm").click(function () {
		var interest = $("#newFundInterest").val();
		var type = $(".newFundType").val();
		var minDeposit = $("#minDeposit").val();

		newFund(interest, type, minDeposit);
	});
	
	$("#investWithdrawValueSubmit").click(function () {
		var value = $("#investWithdrawValue").val();
		var investID = document.getElementById("investWithdrawFundID").innerHTML;

		returnOnInvest(investID, value);
	});
	
	$("#FundMinDepositSubmit").click(function () {
		var fundID = document.getElementById("newDepositTime").innerHTML;
		var days = document.getElementById("investWithdrawFundID").innerHTML;

		changeFundDepositTime(fundID, days);
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
