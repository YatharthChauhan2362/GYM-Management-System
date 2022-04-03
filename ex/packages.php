
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
        if (isset($_GET['error'])) {
            echo '<p class="error">Error Logging In!</p>';
        }
        ?> 

</div>


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
            <li ><a href="index.php">Home</a></li>
            
           <li class="active" id="a"> <a href="packages.php">Package</a></li>
            <li><a href="facilities.php">Facilities</a></li>
           
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
            
          </form>
          '; ?>

        </div><!--/.navbar-collapse -->
      </div>
    </div>
   </div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
    <table> <tr>
                <td align="right" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="right" valign="top"><table width="98%" border="0" cellspacing="0" cellpadding="0">
                      <tr></tr>
                      <tr>
                        <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="left" valign="top" class="gray12_txt"><table width="100%" border="0" cellpadding="1" cellspacing="1">
                              <tr>
                                <td colspan="4" align="left" valign="top"><p><strong>About Fitness - Packages</strong></p></td>
                                </tr>
                              <tr>
                                <td width="25%" align="left" valign="top"><strong>Duration&nbsp; </strong></td>
                                <td width="25%" align="center" valign="top"><strong>General</strong></td>
                                <td width="25%" align="center" valign="top"><strong>Couple  </strong></td>
                                <td width="25%" align="center" valign="top"><strong>Happy Hours </strong></td>
                                </tr>
                              <tr>
                                <td width="522"><strong>Monthly&nbsp; </strong></td>
                                <td align="center" valign="top">1500 </td>
                                <td align="center" valign="top">2500 </td>
                                <td align="center" valign="top">1000 </td>
                                </tr>
                              <tr>
                                <td width="522"><strong>Quarterly&nbsp; </strong></td>
                                <td align="center" valign="top">3500</td>
                                <td align="center" valign="top">6500</td>
                                <td align="center" valign="top">2500</td>
                                </tr>
                              <tr>
                                <td width="522"><strong>Half-Yearly</strong></td>
                                <td align="center" valign="top">6500</td>
                                <td align="center" valign="top">11000</td>
                                <td align="center" valign="top">4500</td>
                                </tr>
                              <tr>
                                <td width="522"><strong>Yearly</strong></td>
                                <td align="center" valign="top">10000</td>
                                <td align="center" valign="top">18000</td>
                                <td align="center" valign="top">7500</td>
                                </tr>
                              </table></td>
                            </tr>
                          </table
     
       <p><h5><b>About Fitness</b> is having highly qualified team of trainers, they are widely acknowledged as being among the industry's finest and take enormous pride in assisting members wherever they are needed. All are fully accredited on the Exercise Professionals Register and are, of course, insured to deliver some of the most advanced training. They can focus clearly on your goals and pointedly be on hand to ensure you reach them.</h5><br> <h3>Note:</h3>
» 	All Rates are in Indian Rs.<br>
» 	General Rates are applicable for Per Person Bases.<br>
» 	Couple Rates are applicable for Husband & Wife only.<br>
» 	Happy hours Rates are applicable between 11:00 am to 5:00 pm only.</p>
   
    </div>


 <div class="container">
      <!-- Example row of columns -->
  
      </div>


      <hr>

      <footer>
        <p>&copy; Company 2014</p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="boot/js/dialog.js" type="text/javascript"></SCRIPT>
<script type="text/JavaScript" src="boot/js/sha512.js"></script> 
        <script type="text/JavaScript" src="boot/js/forms.js"></script> 
      
    </script>
  </body>
</html>
