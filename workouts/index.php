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
           <li><a href="../profile/i.php">Profile</a></li>
              <li  class="active"><a href="./">Workouts</a></li>
              <li> <a href="../Feedback.php">Feedback</a></li>';
              }?>
             <?php  if(isset($_SESSION['admin'])) {?>
                <li><a href="../att.php">Attendance</a></li>
                <li><a href="../admin/a.php">Admin Panel</a></li>';
              <?php  }?>
               
              
               </ul>
             <?php if(isset($_SESSION['username'])){   echo'  <form class="navbar-form navbar-right" role="form" action="../include/logout.php">
                
            <input type="submit" class="btn btn-success" value="Sign-out"></form>';}?>
</div><!--/.navbar-collapse -->
      </div>
    </div>
    </div>
    <div class="jumbotron" style="background-color: rgba(0,0,0,0);"><?php  if(!isset($_SESSION['admin'])) {?> <h4>Calculate your Bmi Here.</h4>
   <iframe width="100%" height="300" frameborder="0" scrolling="no" src="http://www.bmicalculator.ie/wp-content/themes/default/widget.html"></iframe> 
   <div ><p >Take a look at the workout charts below. The first exercises you’ll see on each training day are relatively big arm movements like weighted bench dips, skull crushers, and barbell curls. The lighter stuff comes last, when your arms are too spent to do much more. Gaining mass and size is all about priorities, and if your objective is to build bigger arms, start with big moves and finish with smaller ones.</p>
<h2><span style="color:#ff0000;">The Workout</span></h2>
<h3>Triceps <span style="margin-left:425;"> Biceps</span></h3><br>
<table border="1" cellpadding="3" cellspacing="3" style="width: 500px;float:left;"><thead><tr><th scope="col">Exercise</th>
<th scope="col">Sets</th>
<th scope="col">Reps</th>
<th scope="col">Rest</th>
</tr></thead><tbody><tr><td>Weighted Bench Dip</td>
<td>3-5</td>
<td>8-12</td>
<td>60-90 sec</td>
</tr><tr><td>Dumbbell Skull Crusher</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>Cable Push-Down (Straight Bar)</td>
<td>3-4</td>
<td>10-15</td>
<td>45-60 sec</td>
</tr></tbody></table>
<table border="1" cellpadding="3" cellspacing="3" style="width: 500px;float:left;margin-left:10;"><thead><tr><th scope="col">Excercise</th>
<th scope="col">Sets</th>
<th scope="col">Reps</th>
<th scope="col">Rest</th>
</tr></thead><tbody><tr><td>Barbell Curl</td>
<td>3-5</td>
<td>6-12</td>
<td>60-90 sec</td>
</tr><tr><td>Alternating Dumbbell Curl</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>"Preacher-Less" Preacher Curl</td>
<td>3-4</td>
<td>10-15</td>
<td>30-45 sec</td>
</tr></tbody></table><br><br><br><br><br>
<p style="margin-left:150;"><h3>Chest<span style="margin-left:442;"> Shoulder</p></h3>
<table border="1" cellpadding="3" cellspacing="3" style="width: 500px;margin-top:10;float:left;position:relative;" ><thead><tr><th scope="col">Exercise</th>
<th scope="col">Sets</th>
<th scope="col">Reps</th>
</tr><tr><td>Incline Barbell Press</td>
<td>4</td>
<td>8</td>
</tr><tr><td>Flat-Bench Dumbbell Press</td>
<td>4</td>
<td>10</td>
</tr><tr><td>Dip</td>
<td>3</td>
<td>TO FAILURE*</td>
</tr><tr><td>Cable Flye</td>
<td>3</td>
<td>12**</td>
</tr></tbody></table>

<table border="1" cellpadding="3" cellspacing="3" style="width: 500px;float:left;margin-left:10;margin-top:10;"><thead><tr><th scope="col">Excercise</th>
<th scope="col">Sets</th>
<th scope="col">Reps</th>
<th scope="col">Rest</th>
</tr></thead><tbody><tr><td>Overhead Barbell Press</td>
<td>2-3</td>
<td>6-12</td>
<td>60-90 sec</td>
</tr><tr><td>Inclie Rear Delt-Raise</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>Dumbell Lateral Raise</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>Dumbell Front Raise</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>Upright Row</td>
<td>3-4</td>
<td>8-12</td>
<td>45-60 sec</td>
</tr><tr><td>"Dumbell Shrug</td>
<td>3-4</td>
<td>10-15</td>
<td>30-45 sec</td>
</tr></tbody></table><br><br><br>
<br><br><br><br><br>
<p style="margin-left:150;"><h3>Legs<span style="margin-left:442;"></p></h3>
<table border="1" cellpadding="1" cellspacing="1" class="exercise" style="width: 500px;float:left;"><thead><tr><th scope="col">Exercise</th>
<th scope="col">Sets</th>
<th scope="col">Reps</th>
</tr></thead><tbody><tr><td>Barbell Squat</td>
<td>4</td>
<td>8-10</td>
</tr><tr><td>Leg Extension</td>
<td>4</td>
<td>12-15</td>
</tr><tr><td>Hack Squat</td>
<td>3-4</td>
<td>10-12</td>
</tr><tr><td>Dumbbell Lunge</td>
<td>3-4</td>
<td>15</td>
</tr></tbody></table>

</div>
   <?php  }?> </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="../boot/js/dialog.js" type="text/javascript"></SCRIPT>
</body>
 </body>
 </html>