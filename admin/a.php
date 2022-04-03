<?php
include_once '../include/db_connect.php';
include_once '../include/functions.php';
include_once '../include/register.inc.php';
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
$q1 = "SELECT * FROM `members` WHERE paid = 0";
$um = mysqli_query($mysqli,$q1);
$qe="SELECT * FROM `members`";
$att=mysqli_query($mysqli,$qe);


if(isset($_POST["pay"]))
{
$number = $_POST["number"];
$price = $_POST["price"];
$vat = $_POST["vat"];
$bank = $_POST["bank"];
$paypal = $_POST["paypal"];
$com = $_POST["com"];
$pay = 'Member payed:';
$price = str_replace(",",".",$price);
$vat = str_replace(",",".",$vat);
$p = explode(" ",$price);
$v = explode(" ",$vat);
$re = $p[0] + $v[0];
function r($r)
{
$r = str_replace("Rs","",$r);
$r = str_replace(" ","",$r);
$r = $r." Rs";
return $r;
}
$price = r($price);
$vat = r($vat);
require('u/fpdf.php');

class PDF extends FPDF
{
function Header()
{
if(!empty($_FILES["file"]))
  {
$uploaddir = "logo/";
$nm = $_FILES["file"]["name"];
$random = rand(1,99);
move_uploaded_file($_FILES["file"]["tmp_name"], $uploaddir.$random.$nm);
$this->Image($uploaddir.$random.$nm,10,10,20);
unlink($uploaddir.$random.$nm);
}
$this->SetFont('Arial','B',12);
$this->Ln(1);
}
function Footer()
{
$this->SetY(-15);
$this->SetFont('Arial','I',8);
$this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
}
function ChapterTitle($num, $label)
{
$this->SetFont('Arial','',12);
$this->SetFillColor(200,220,255);
$this->Cell(0,6,"$num $label",0,1,'L',true);
$this->Ln(0);
}
function ChapterTitle2($num, $label)
{
$this->SetFont('Arial','',12);
$this->SetFillColor(249,249,249);
$this->Cell(0,6,"$num $label",0,1,'L',true);
$this->Ln(0);
}
}

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Times','',12);
$pdf->SetTextColor(32);
$pdf->Cell(0,5,'About Fitness',0,1,'R');
$pdf->Cell(0,5,'Projectworlds',0,1,'R');
$pdf->Cell(0,5,'projectworldsofficial@gmail.com',0,1,'R');
$pdf->Cell(0,5,'Mob: +916263056779',0,1,'R');
$pdf->Cell(0,30,'',0,1,'R');
$pdf->SetFillColor(200,220,255);
$pdf->ChapterTitle('Invoice Number ',$number);
$pdf->ChapterTitle('Invoice Date ',date('d-m-Y'));
$pdf->Cell(0,20,'',0,1,'R');
$pdf->SetFillColor(224,235,255);
$pdf->SetDrawColor(192,192,192);
$pdf->Cell(170,7,'Item',1,0,'L');
$pdf->Cell(20,7,'Price',1,1,'C');
$pdf->Cell(170,7,'Member Plan FEE',1,0,'L',0);
$pdf->Cell(20,7,$price,1,1,'C',0);
$pdf->Cell(0,0,'',0,1,'R');
$pdf->Cell(170,7,'VAT',1,0,'R',0);
$pdf->Cell(20,7,$vat,1,1,'C',0);
$pdf->Cell(170,7,'Total',1,0,'R',0);
$pdf->Cell(20,7,$re." Rs",1,0,'C',0);
$pdf->Cell(0,20,'',0,1,'R');
$pdf->Cell(0,5,$pay,0,1,'L');
$pdf->Cell(0,5,$bank,0,1,'L');
$pdf->Cell(0,20,'',0,1,'R');
$pdf->Cell(190,40,$com,0,0,'C');
$filename="{$bank}.pdf";
$pdf->Output($filename,'F');
$jack=mysqli_query($mysqli,"UPDATE `members` SET paid = 1 where username = '$bank'");
if($jack)
{
header('location:../admin/a.php');
}
}
?>
<!doctype html>
<html>
<head>
<title>Admin Panel</title>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>Admin Panel</title>
    

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
            <?php if (!isset($_SESSION['username'])){echo'
            <li><a href="about.php">About</a></li>
            <li><a href="contact.php">Contact</a></li>';}?>
            <li  ><a href="../profile/i.php">Profile</a></li>
              <li><a href="../workouts">Workouts</a></li>
              <li><a href="../att.php">Attendance</a></li>

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
  <li class="active"><a href="#register" data-toggle="tab">Register Member</a></li>
  <li><a href="#mems" data-toggle="tab">View/Edit Members</a></li>
  <li><a href="#unp" data-toggle="tab">Unpaid Members&nbsp;<span class="badge"><?php echo mysqli_num_rows($um); ?></span></a></li>
  <li><a href="#att" data-toggle="tab">Mark Attendance</a></li>
  <li><a href="#pay" data-toggle="tab">Make Payment</a></li>
</ul>

<!-- Tab panes -->
<div class="tab-content">
 
  <div class="tab-pane fade in active" id="register" style="background-color:#fff;">
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
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <?php
        while ($ro = mysqli_fetch_array($um)) {
          echo "<tr>";
          echo "<td>".$ro['id']."</td>";
          echo "<td>".$ro['username']."</td>";
          echo "<td>".$ro['email']."</td>";
          echo "</tr>";
        }
        ?>
      </tbody>
</table>
  </div>
  <div class="tab-pane fade" id="att" style="background-color:#fff;">
  <table class="table table-hover">
  <thead>
        <tr>
          
          <th>Username</th>
          </tr>
          </thead>
          <tbody>
     <?php
     while ($r =mysqli_fetch_array($att))
     {
      echo"<tr>";
      echo "<td>".$r['username']."";
      echo "</tr>";
      }
      ?>
      </tbody></table>
      
    <form method="POST" action="../att/matt.php" class="form-signin" id="sign-up-form">
   
<pre>

Enter USERNAME to mark the present: <input type="text" name="id" size="5">
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
  <div class="tab-pane fade" id="pay" style="background-color:#fff;">
 <form action="" method="POST" id="sign-up-form" class="form-signin">
   <div class="control-group">
  <input type="text" class="form-control" placeholder="Insert Price" name="price" >
  </div>
  

  <div class="control-group">
  <input type="text" class="form-control" placeholder="VAT" name="vat">
  </div>
<div class="control-group">
  <input type="text" class="form-control" placeholder="paypal" name="paypal">
  </div>
  <div class="control-group">
  <input type="text" class="form-control" placeholder="Invoice Number" name="number">
  </div>
  <div class="control-group">
  <input type="text" class="form-control" placeholder="Username" name="bank" >
  <br />
  </div>

  <input type="submit" class="btn btn-lg btn-primary btn-block" value="Make Payment" name="pay" />

</form>
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