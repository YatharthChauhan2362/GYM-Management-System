<?php
include_once 'include/register.inc.php';
include_once 'include/functions.php';
sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
if(!isset($_SESSION['admin']))
{
  echo "<h1>403 FORBIDDEN ACCESS<br>
  Only admin is allowed to view this page.
  Click <a href='index.php'>here</a> to go to index page.
  </h1>";
  exit();
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
    <body>
        <!-- Registration form to be output if the POST variables are not
        set or if the registration script caused an error. -->
        
        <?php
        if (!empty($error_msg)) {
            echo $error_msg;
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
          <a class="navbar-brand" href="index.php">About Fitness</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li  id="a"><a href="index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>
          </ul>
       
    
        
         <?php
    if(isset($_SESSION['username']))
 {
 echo '<form class="navbar-form navbar-right" role="form" action="include/logout.php">
           
             
           
            <input type="submit" class="btn btn-success" value="Sign-out"></form>';
}
?>
           
        </div><!--/.navbar-collapse -->
      </div>
    </div>

<form action="<?php echo esc_url($_SERVER['PHP_SELF']); ?>" method="POST" id="sign-up-form" class="form-signin">
  <h2 class="form-signin-heading">Create an account</h2>
      
 <!-- <div class="control-group">
  <input type="text" class="form-control" placeholder="your name" name="name">
  </div>-->
  
 
  

  <div class="control-group">
  <input type="text" class="form-control" placeholder="Username" name="username" id="username">
  </div>
  
  <div class="control-group">
  <input type="text" class="form-control" placeholder="email address" name="email" id="email">
  </div>

  <div class="control-group">
  <input type="password" class="form-control" placeholder="password" name="password" id="password">
  </div>

  <div class="control-group">
  <input type="password" class="form-control" placeholder="password confirmation" name="confirmpwd" id="confirmpwd">
  <br />
  </div>

  <input type="submit" class="btn btn-lg btn-primary btn-block" value="Create Account" 
  onclick="return regformhash(this.form,this.form.username,this.form.email,this.form.password,this.form.confirmpwd);"/>

</form>
      
        <script type="text/JavaScript" src="boot/js/sha512.js"></script> 
        <script type="text/JavaScript" src="boot/js/forms.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="boot/js/dialog.js" type="text/javascript"></SCRIPT>
    </body>
</html>