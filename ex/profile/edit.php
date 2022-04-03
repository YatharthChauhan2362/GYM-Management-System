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
$i = $_GET['id'];
if(isset($_GET['id']))
{
$id = $_GET['id'];
$q = mysqli_query($mysqli,"SELECT * FROM `members` WHERE id= '$id'");
$q1 = mysqli_fetch_array($q);
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>About Fitness</title>
    

    <!-- Bootstrap core CSS -->
    <link href="../boot/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="../boot/css/main.css" rel="stylesheet">
    <body>
    	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="../index.php">About Fitness</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
          	<li id="a"><a href="../index.php">Home</a></li>
             <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>
            <li  ><a href="./">Profile</a></li>
              <li><a href="../workouts">Workouts</a></li>
              <li class="active"><a href="../admin/a.php">Admin Panel</a></li>
          </ul>
              <form class="navbar-form navbar-right" role="form" action="../include/logout.php">
         
            <input type="submit" class="btn btn-success" value="Sign-out"></form>
</div><!--/.navbar-collapse -->
      </div>
      </div>
    	<form action="action.php?id=<?php echo $i; ?>" method="POST" id="sign-up-form" class="form-signin">
  <h2 class="form-signin-heading">Edit an Account</h2>
      
 <!-- <div class="control-group">
  <input type="text" class="form-control" placeholder="your name" name="name">
  </div>-->
  
 
  

  <div class="control-group">
  <input type="text" class="form-control" value="<?php echo $q1['username'];?>" name="username" id="username">
  </div>
  
  <div class="control-group">
  <input type="text" class="form-control" value="<?php echo $q1['email'];?>" name="email" id="email">
  </div>

  <input type="submit" class="btn btn-lg btn-primary btn-block" value="Edit Account" />

</form>
      
        
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    </body>
</html>