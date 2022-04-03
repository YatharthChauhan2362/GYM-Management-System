<?php
include_once 'include/db_connect.php';
include_once 'include/functions.php';

sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
$firstname = mysqli_real_escape_string($mysqli, $_SESSION['username']);
$lastname = mysqli_real_escape_string($mysqli, $_POST['feed']);

$sql="INSERT INTO feedbacks (username,feed)
VALUES ('$firstname', '$lastname')";

if (!mysqli_query($mysqli,$sql)) {
  die('Error: ' . mysqli_error($mysqli));
}
else{
	header("location: Feedback.php?success=1");
}
mysql_close($mysqli);
?>