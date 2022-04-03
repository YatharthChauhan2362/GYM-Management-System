
<link rel="stylesheet" type="text/css" href="style.css">

<head><title>ABOUT FITNESS</title>
<script type="text/JavaScript" src="js/sha512.js"></script>
        <script type="text/JavaScript" src="js/forms.js"></script>
 </head>
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

   <div id=container>
<div id="top"><img src="img/af.jpg" width="250" height="100"/></div>


<div id="menu">
<ul>
<li class="home"><a>Home Page</a> </li>

    <li class="all"><a href="gymroutine.php">Workout </a></li>
    <li class="all"><a href="gallery.php">Gallery </a></li>

    <?php
    if (isset($_SESSION['admin'])) {
      echo "
      <li class='all'><a href='att.php'>Attendance</a> </li>";
    }
     ?>
    <li class='all'><a href=''>Pending</a> </li>

    <?php
    if(isset($_SESSION['username'])){
    echo "
       <li class='all'><a href='include/logout.php'> Log out </a></li>
       <li class='all'><a href='profile/'> Profile </a></li>

       ";
       }
       ?>
    <li class="all"><a href="contact.php"> Contact Us </a></li>


    <li class="last"><img src="img/menu-right.gif" width="14" height="59" alt="ABOUT-FITNESS" /></li>
  </ul>
</div>

<div id="header"><img src="img/header.jpg" width="942" height="285" /></div><!HEader>


<div id="content">




  <div id="content-left">
  <p><img src="img/welcome.gif" width="327" height="44" /></p>
 <?php
 if(isset($_SESSION['username']))
 {
 echo " <h1>WELCOME ".$_SESSION['username']."</h1><br><Br><hr>";
}
 ?>


  <p>This is your Destination for Acheiving your Goals. </p>
  <p><strong>Different Workouts And Routines</strong></p>
  <p> With Complete INformation about Fitness This is your Best Chance of getting in best shape of your life.</p>
  <p> Advice from best Fitness Models in the industry Giving YOu INformation on : </p>
  <ul>
    <li><B>NUTRITION</li>
    <li>WORKOUT </li>
    <li>ROUTINES </li>
    <li>SUPPLEMENTAION </li>
    <li>KNOW-HOW OF Body-BUilding</B> </li>
  </ul>
  <p>The Only one who can stop you from getting what you want is <b>"YOU"</b>.</p>

</div>
<div id='content-right'>
  <?php
        if (isset($_GET['error'])) {
            echo '<p class="error">Error Logging In!</p>';
        }
        ?>
<?php
if(!isset($_SESSION['username']))
{echo "

<div class='gym'>
<form  method='post' action='include/process_login.php' >
<table cellspacing=5 cellpadding=7>
<tr><td><center>&nbsp; Email-ID<input type='email' name='email' style=';width:55%;margin-left:24;'> </td></tr>
<tr><td><center> &nbsp;Password<input type='password' name='password' style='width:55%;margin-left:16;'></td></tr><br>
<tr><td colspan=2><input type='button' value='Log-IN' onclick='formhash(this.form, this.form.password);' style='margin-left:40;'>

<b>OR </b><a href='/register.php'>SignUp</a></td></tr></table></div>  </form>"
}
else
{}
?>

<p>&nbsp;</p>
<p><a href="https://www.metrx.com" target=_blank><img src="img/mem-details.gif" width="300" height="400"/> </a></p>
</div>

<div id="footer"><p><a href="home.php">Home Page</a>  <a href=""></a> | <a href="https://www.healthkart.com" target=_blank>Healthkart.com</a> | <a href="https://www.bodybuilding.com" target=_blank>BodyBuilding.COM</a> |  <a href="Contact.php">Contact Us</a></p>


<div class="copy"> 2013<sup>©</sup> Copyright ABOUT-FITNESS All Rights Reserved </div>

<div class="web">
  <p><a href="http://www.facebook.com/navgag333" target="_blank">Creator</a></p>
</div>

</div>
</div>
</body>
</html>
