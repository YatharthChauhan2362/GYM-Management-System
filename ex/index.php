
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
             <?php if (!isset($_SESSION['username'])){echo'<li class="active" id="a">
            <a href="#">Home</a></li>
              <li><a href="packages.php">Package</a></li>
              <li><a href="facilities.php">Facilities</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li></ul>
            ';
            }
            ?>
           <?php
            if(isset($_SESSION['username'])) {
              echo '<li><a href="./profile/">Profile</a></li>
              <li><a href="./workouts">Workouts</a></li></li>';
              if(isset($_SESSION['admin'])) {
                echo '<li><a href="att.php">Attendance</a></li></ul>';
              }
            }
            ?>
         
        
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
       <ul class="bxslider">
  <li><img src="img/1.jpg" /></li>
  <li><img src="img/2.jpg" /></li>
  <li><img src="img/3.jpg" /></li>
  <li><img src="img/4.jpg" /></li>
  <li><img src="img/5.jpg" /></li>
  <li><img src="img/6.jpg" /></li>
  <li><img src="img/7.jpg" /></li>
  <li><img src="img/8.jpg" /></li>
</ul>
     </div>

    <div class="container">
      
      <div class="row">
       
        <div class="col-md-4" id="a2">
          <a href="packages.php"><h2>Packages</h2></a>
        <p><h4>This is your Destination for Acheiving your Goals. </h4></p>
          <p><a class="btn btn-default" href="packages.php" role="button" id="c1">View details &raquo;</a></p>
       </div>
        <div class="col-md-4" id="a3">
         <a href="facilities.php"> <h2>Facilities</h2></a>
          <p><h4>We Provide What You need to Be better than Before.<h4><a class="btn btn-default" href="facilities.php" role="button" id="c2">View details &raquo;</a></p>
        </div>
      </div>

 
 
 
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
