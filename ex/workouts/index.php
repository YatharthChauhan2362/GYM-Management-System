<?php
include_once '../include/db_connect.php';
include_once '../include/functions.php';

sec_session_start();
  $username = $_SESSION['username'];

$query = "SELECT * FROM `members` WHERE username = '$username'";
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<html>
<head>
<title>Workouts</title>
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
    <link href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" text="text/css" rel="stylesheet">
    <link href="../boot/css/jquery.bxslider.css" rel="stylesheet" />
    
    
      
    

</head>
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
           
              
            <?php if(!isset($_SESSION['username'])){
             echo'<li id="a"><a href="../index.php">Home</a></li>
             <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>';
           }?>
           
           <?php if(isset($_SESSION['username'])){ echo'
           <li><a href="../profile/">Profile</a></li>
              <li  class="active"><a href="./">Workouts</a></li></ul>';
              }?>
             <?php  if(isset($_SESSION['admin'])) {echo'
                <li><a href="../att.php">Attendance</a></li></ul>';
                }?>
             <?php if(isset($_SESSION['username'])){   echo'  <form class="navbar-form navbar-right" role="form" action="../include/logout.php">
                
            <input type="submit" class="btn btn-success" value="Sign-out"></form>';}?>
</div><!--/.navbar-collapse -->
      </div>
    </div>
    </div>
    <div class="jumbotron"><h1>All content here</h1></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="../boot/js/dialog.js" type="text/javascript"></SCRIPT>
</body>
 </body>
 </html>