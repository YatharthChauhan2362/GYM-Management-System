<?php
include_once '../include/db_connect.php';
include_once '../include/functions.php';
sec_session_start();

if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
if(!isset($_SESSION['admin']))
{
	header("location: i.php");
}
$i = $_GET['id'];
$username = $_POST['username'];
$email = $_POST['email'];
$query1=mysqli_query($mysqli,"UPDATE `members` SET username ='$username', email = '$email' where id = '$i'");
if($query1)
{
header('location:../admin/a.php');
}
?>