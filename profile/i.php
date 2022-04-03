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
$list .= '<tr><td>'.$row["id"].'<td>'.$row["username"].'<td>'.$row["days"].'<td>'.$row["present"].'<td>'.$row["absent"].'<td>'.$row["pect"].'</tr>'; 
}
else{
	echo "access forbidden";
}

if(!isset($_SESSION['username']))
{
	header("location: ../index.php");
	exit();
}
?>
<!doctype html>
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
  <?php if(isset($_GET['erro'])){ echo "<p style='display: none;' class='erro'>".$_GET['erro']."</p>";} ?>
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
           <?php if(!isset($_SESSION['username'])){?>
           	<li id="a"><a href="../index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
           <li><a href="contact.php">Contact</a></li>
           <?php }?>
            <li  class="active"><a href="../profile/i.php">Profile</a></li>
            
              <li><a href="../workouts">Workouts</a></li>
              <li>
              <?php if(isset($_SESSION['admin'])){ echo'<a href="../admin/feed.php">Feedback</a>';}
              else{
                echo "<a href='../Feedback.php'>Feedback</a>";
              } ?>
              </li>
              <?php if(isset($_SESSION['admin'])) { ?>
              <li><a href="../att.php">Attendance</a></li>
              <li><a href="../admin/a.php">Admin Panel</a></li>
              <?php } ?>
          </ul>
              <form class="navbar-form navbar-right" role="form" action="../include/logout.php">
         
            <input type="submit" class="btn btn-success" value="Sign-out"></form>
</div><!--/.navbar-collapse -->
      </div>
      </div>
      <div class="jumbotron">
  <div class="row">
  <div class="col-md-4" style="width:100px;">
     <?php if($row['pic'] == 0) { ?>
    <img src="../img/thumb.png" width="100px" height="100px"><br><br>
    <form method="POST" action="../upload.php?id=<?php echo $row['id']; ?>" enctype="multipart/form-data">
    <input type="file" name="file" style="color: transparent;" accept="image/x-png, image/gif, image/jpeg"><br>
    <input type="submit" value="upload" name="pupload">
    </form>
    <?php } else if($row['pic'] == 1){ ?>
    <img src="../upload/<?php echo $row['picName']; ?>" width="100px" height="100px">
    <?php } ?>
  </div>
  <div class="col-md-8" >&nbsp;
    <label>Username</label>: <?php echo $row["username"];?><br>
    &nbsp;&nbsp;<label>Email</label>: <?php echo $row["email"];?><br>
    &nbsp;&nbsp;<label>Total Days</label>: <?php echo $row["days"];?><br>
    &nbsp;&nbsp;<label>Days Present</label>: <?php echo $row["present"];?><br>
    &nbsp;&nbsp;<label>Days Absent</label>: <?php echo $row["absent"];?><br>
    &nbsp;&nbsp;<label>Attendance Percentage</label>: <?php echo $row["pect"];?><br>
    <?php if($row['paid'] == 1) { ?>
    <a href="../admin/<?php echo $row['username']; ?>.pdf">Invoice</a>
    <?php } ?>
  </div>
</div>
  </div>








	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="../boot/js/dialog.js" type="text/javascript"></SCRIPT>
  <script type="text/javascript">
$(document).ready(function() {
  $('.erro').each(function(){
    alert("No picture Selected");
  });
});
    </script>
</body>
</html>