<?php
include_once 'include/db_connect.php';
include_once 'include/functions.php';
$user = $_GET['id'];
$allowedExts = array("jpg", "jpeg", "gif", "png","JPG");
$extension = @end(explode(".", $_FILES["file"]["name"]));
if(isset($_POST['pupload'])){
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/JPG")
|| ($_FILES["file"]["type"] == "image/png")
|| ($_FILES["file"]["type"] == "image/pjpeg"))
&& ($_FILES["file"]["size"] < 20000000000000)
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {
    

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
      unlink("upload/" . $_FILES["file"]["name"]);
      }
    else
      {
          $pic=$_FILES["file"]["name"];
            $conv=explode(".",$pic);
            $ext=$conv['1'];

      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/". $user.".".$ext);
      $url=$user.".".$ext;
    
      $query="update members set pic=1, picName='$url' where id='$user'";
      if($upl=$mysqli->query($query)){
          header("location: profile/i.php");
              }
      }
    }
  }
else
  
  header("location: /profile/i.php");

  }

?>