$(document).ready(function () {
	$(".pageTitle").html('Admin');
	$(".current-page").html('<li class="current-page">Admin</li>');

	setTimeout(getSuperInfo, 1000);
	setTimeout(getUserInfo, 1000);
	setTimeout(getFundsInfo, 1000);
	setTimeout(getInvestsInfo, 1000);
	setTimeout(getWithdrawsInfo, 1000);
	
	$("#defaultADD").click(function () {
		alert("default+");
		var fundID = document.getElementById("fundShownID").innerHTML;
		changeDefaultCount(fundID, true);
	});
	
	$("#defaultSUB").click(function () {
		var fundID = document.getElementById("fundShownID").innerHTML;
		changeDefaultCount(fundID, false);
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
