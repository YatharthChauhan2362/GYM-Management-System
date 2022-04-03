<?php
include_once '../include/db_connect.php';
include_once '../include/functions.php';
sec_session_start();
 $admin = $_SESSION['admin'];

if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
if(!isset($_SESSION['admin']))
{
	header("location: i.php");
}
if(isset($_GET['id']))
{
$id=$_GET['id'];
$query1=mysqli_query($mysqli,"delete from members where id='$id'");
if($query1)
{
header('location:../admin/a.php');
}
}
?>