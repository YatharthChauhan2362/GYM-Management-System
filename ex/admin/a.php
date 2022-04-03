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
	header("location: ../profile/i.php");
	exit();
}
$query = "SELECT * FROM `members`";
$members = mysqli_query($mysqli,$query);
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
      <div style="padding-top: 60px; "></div>
      <div class="jumbotron" style="width: 100%;">
<ul class="nav nav-tabs">
  <li class="active"><a href="#end" data-toggle="tab">Ending Memberships&nbsp;<span class="badge">3</span></a></li>
  <li><a href="#register" data-toggle="tab">Register Member</a></li>
  <li><a href="#mems" data-toggle="tab">View/Edit Members</a></li>
  <li><a href="#unp" data-toggle="tab">Unpaid Members&nbsp;<span class="badge">3</span></a></li>
  <li><a href="#att" data-toggle="tab">Mark Attendance</a></li>
  <li><a href="#add" data-toggle="tab">Add Plan</a></li>
  <li><a href="#edit" data-toggle="tab">Edit Plans</a></li>
  <li><a href="#pay" data-toggle="tab">Make Payment</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
  <div class="tab-pane fade in active" id="end" style="background-color:#fff;">
  	<table class="table table-hover">
  <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
</table>
  </div>
  <div class="tab-pane fade" id="register" style="background-color:#fff;">
  	<form action="<?php echo esc_url($_SERVER['PHP_SELF']); ?>" method="POST" id="sign-up-form" class="form-signin">
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
  </div>
  <div class="tab-pane fade" id="mems" style="background-color:#fff;">
    <table class="table table-hover">
  <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Attedance %</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php
        while($row = mysqli_fetch_array($members))
        { 
        echo "<tr>";
          echo "<td>".$row['id']."</td>";
          echo "<td>".$row['username']."</td>";
          echo "<td>".$row['email']."</td>";
          echo "<td>".$row['pect']."</td>";
          echo "<td><a href='../profile/edit.php?id=".$row['id']."' class='btn btn-warning'>Edit</a>&nbsp;&nbsp;<a href='../profile/delete.php?id=".$row['id']."' class='btn btn-danger'>Delete</a></td>";        
          echo "</tr>";
      }
        ?>
      </tbody>
      
</table>
  </div>
  <div class="tab-pane fade" id="unp" style="background-color:#fff;">
    <table class="table table-hover">
  <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
</table>
  </div>
  <div class="tab-pane fade" id="att" style="background-color:#fff;">
    <form method="POST" action="../att/matt.php" class="form-signin" id="sign-up-form">
<pre>
Enter USERNAME to mark present: <input type="text" name="id" size="5">
<input type="submit" value="Submit" class="btn btn-warning">&nbsp;<input type="reset" class="btn btn-danger">
</pre>
</form>

<br>
<form method="POST" action="../att/matta.php" class="form-signin" id="sign-up-form">
<pre>
Enter USERNAME to mark absent: <input type="text" name="id" size="5">
<input type="submit" value="Submit" class="btn btn-warning" >&nbsp;<input type="reset" class="btn btn-danger">
</pre>
</form>
  </div>
  <div class="tab-pane fade" id="add" style="background-color:#fff;">
    <form action="" method="POST" id="sign-up-form" class="form-signin">
   <div class="control-group">
  <input type="text" class="form-control" placeholder="Plan Name" name="plan" >
  </div>
  
  <div class="control-group">
  <input type="text" class="form-control" placeholder="Detail" name="detail" >
  </div>

  <div class="control-group">
  <input type="text" class="form-control" placeholder="Days" name="days">
  </div>

  <div class="control-group">
  <input type="text" class="form-control" placeholder="Rate" name="rate" >
  <br />
  </div>

  <input type="submit" class="btn btn-lg btn-primary btn-block" value="Add Plan"/>

</form>
  </div>
  <div class="tab-pane fade" id="edit" style="background-color:#fff;">...</div>
  <div class="tab-pane fade" id="pay" style="background-color:#fff;">...</div>
</div>      

</div>





	<script type="text/JavaScript" src="../boot/js/sha512.js"></script> 
        <script type="text/JavaScript" src="../boot/js/forms.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    <SCRIPT TYPE="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></SCRIPT>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
 <SCRIPT src="a.js" type="text/javascript"></SCRIPT>
</body>
</html>