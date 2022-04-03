<?php
include_once '../include/db_connect.php';
include_once '../include/functions.php';
sec_session_start();

if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
$username = $_POST['id'];
if(isset($_SESSION['admin'])) {
	$q = mysqli_query($mysqli, "UPDATE `members` SET present = present+1 , days = days+1, pect = present*100/days WHERE username = '$username'");

	header("location: ../att.php");
}
else {
		echo "access forbidden";
	}

?>

