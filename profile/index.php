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
if (isset($_SESSION['username'])) {
$list = '';
$result = mysqli_query($mysqli,$query);
$row = mysqli_fetch_array($result);
$list .= '<tr><td>'.$row["id"].'<td>'.$row["username"].'<td>'.$row["days"].'<td>'.$row["present"].'<td>'.$row["absent"].'<td>'.$row["pect"].'</tr>'; }
else{
	echo "access forbidden";
}
if(isset($_SESSION['admin'])) 
{echo ' <a href="../register.php"> Register New User</a>';
}

?>
<html>
<head>
<title>Profile</title>
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
    
    
      
    
    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
	<?php
	if(isset($_SESSION['username'])) {
echo '<div class="form-signin" id="sign-up-form" style="max-width:50%; padding-left:120px;"><table border=3>
<tr><th>ID</th><th>Username</th><th>Total days</th><th>Present</th><th>Absent</th><th>Percentage</th>';
	
	if(isset($list)) {
		echo $list;
	}

echo '</table></div>
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
            ';
             
             
             <li id="a"><a href="../index.php">Home</a></li>
             if(!isset($_SESSION['username'])){
             echo'<li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>';
           }
           echo ' <li  class="active"><a href="./">Profile</a></li>
              <li><a href="../workouts">Workouts</a></li>';
              
              	if(isset($_SESSION['admin'])) { echo '
              	<li><a href="../att.php">Attendance</a></li></ul>';
              	}
              	echo '<form class="navbar-form navbar-right" role="form" action="../include/logout.php">
         
            <input type="submit" class="btn btn-success" value="Sign-out"></form>
</div><!--/.navbar-collapse -->
      </div>
      </div>
     
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="boot/js/dialog.js" type="text/javascript"></SCRIPT>
</body>
</html>'; } ?>