<?php

include_once '../include/db_connect.php';
include_once '../include/functions.php';
sec_session_start();

if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
$fn=$_POST['fn'];
$username = $_POST['id'];
if(isset($_SESSION['username'])) {
	$q = mysqli_query($mysqli, "UPDATE `members` SET fname = '$fn' WHERE username = '$username'");
	echo "$fn";
	//header("location: ../profile/index.php");
}
else{
echo "something Wrong Happened"
}


?>