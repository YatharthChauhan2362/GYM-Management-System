<?php

if(isset($_POST['send']))
{
$name = $_POST['name'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$email = $_POST['email'];
$phone = $_POST['phone'];

}


$connection = new mysqli('localhost', 'root', '', 'join');

if ($connection->connect_error)
 {
   die('Connection Failed' -$connection->connect_error);
} 
else
 {
   $stmt=$connection->prepare("insert into personal_information(name, gender, dob, address, city, state, zipcode, email, phone) values(?, ?, ?, ?, ?, ?, ?, ?, ?)");

   $stmt->bind_param("ssisssisi", $name, $gender, $dob, $address, $city, $state, $zipcode, $email, $phone);

    $stmt->execute();
   $stmt->store_result();
  
   echo "Joined Successfully";

   $stmt->close();
   $connection->close();


}

// if ($connection) {
//     echo "Connected";
// } else {
//     echo "Error Ocurred";
// }
?>