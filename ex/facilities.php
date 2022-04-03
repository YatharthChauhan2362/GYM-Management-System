
<?php
include_once 'include/db_connect.php';
include_once 'include/functions.php';
 
sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
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
    <link href="boot/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="boot/css/main.css" rel="stylesheet">
    <link href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" text="text/css" rel="stylesheet">
    <link href="boot/css/jquery.bxslider.css" rel="stylesheet" />
    <link href="boot/css/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" />
    
      
    
   
  </head>

  <body>

 <?php
        if (isset($_GET['error'])) {
            echo '<p class="error"></p>';
        }
        if(isset($_GET['reg'])) {
          echo '<p class="reg"></p>';
        }
        ?> 


    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">About Fitness</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
           <li><a href="index.php">Home</a></li>
            <li><a href="packages.php">Package</a></li>
            <li  class="active" id="a"><a href="#">Facilities</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>
           <?php
            if(isset($_SESSION['username'])) {
              echo '<li><a href="./profile/">Profile</a>
              <li><a href="./workouts">Workouts</a>';
              if(isset($_SESSION['admin'])) {
                echo '<li><a href="att.php">Attendance</a>';
              }
            }
            ?>
          </ul>
        
    <?php
    if(isset($_SESSION['username']))
 {
 echo '<form class="navbar-form navbar-right" role="form" action="include/logout.php">
           
             
           
            <input type="submit" class="btn btn-success" value="Sign-out">';
}
 else echo '
        
          <form class="navbar-form navbar-right" role="form" method="post" action="include/process_login.php">
           <div class="form-group">
              <input type="text" placeholder="Email" class="form-control" name="email">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control" name="password">
            </div>
            <input type="submit" class="btn btn-success" value="Sign in" onclick="formhash(this.form, this.form.password);">
          
          </form>'
           ?>

        </div><!--/.navbar-collapse -->
      </div>
    </div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <!--too add vids
          <li>
    <iframe src="http://player.vimeo.com/video/17914974" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
  </li>
       -->
  

    <div class="container">
<table>
<tr><td><h4>Cardio Center</h4>
Cardio is short for cardiovascular, which refers to the heart. Cardiovascular exercise is exercise that raises your heart rate and keeps it elevated for a period of time. Another name for it is aerobic exercise. The kinds of exercise that are associated with cardiovascular workouts are things like jogging, fast walking, and swimming where there is no break in the routine. Exercises that emphasize stretch and strength, like Pilates, are generally not considered cardio exercise, though Pilates can be done in a cardio way, and can certainly be combined with cardio workouts to great effect.</td>
<td><img src="img/cardio.png"></td></tr></table>

<br>
<table><tr><td colspan=1>     <img src="img/strength.png"></td><td valign=top>&nbsp;&nbsp;&nbsp;<h4>Strength Training</h4>A method of improving muscular strength by gradually increasing the ability to resist force through the use of free weights, machines, or the person's own body weight. Strength training sessions are designed to impose increasingly greater resistance, which in turn stimulates development of muscle strength to meet the added demand. This section is equipped with the latest machines from Larous, India, which isolate targeted muscles for more specialized training.</td></tr></table>
 <table><tr><td><h4>Aerobics</h4>
Aerobics is an effective physical exercise which is often done to music. Apart from staying power, strength, flexibility, coordination, and tact are trained. Aerobics is very popular with women who do it together in a group following an instructor or alone in front of the television. In the 1960s, Dr. Med. Kenneth H. Cooper introduced an exercise training in order to strengthen the heart and the lungs and took the first step of the "aerob" training in the United States. His published book Aerobics finally led to a gymnastic staying power-training, to Aerobics. </td>
<td><img src="img/aerobics.png"></td></tr></table>    
      
      
     
     

 
 
 
      <hr>

      <footer>
        <p>&copy; Company 2014</p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/JavaScript" src="boot/js/sha512.js"></script> 
        <script type="text/JavaScript" src="boot/js/forms.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="boot/js/dialog.js" type="text/javascript"></SCRIPT>
 <script src="boot/js/jquery.bxslider.min.js"></script>
  <script type="text/javascript" src="boot/js/slide.js"></script>
  <script src="boot/js/plugins/jquery.fitvids.js"></script>


  </body>
</html>
