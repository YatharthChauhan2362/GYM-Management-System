$(document).ready(function() {
	$("#a1").dialog({
		autoOpen: false,
		title: 'Sign up',
		width: 500,
		height: 400,
		modal: true
	});
	$("#c").on('click', function() {
		$("#a1").dialog("open");
	}); 
	$('.error').each(function(){
		alert("Error logging In check email or password.");
	});
	$('.reg').each(function(){
		alert("Registration successful now you can login.");
	});
	$("#c").on('click', function(){
		window.location.href = 'register.php';
	});
});