<?php


$name = $_POST['name'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$connection = mysqli_connect('localhost', 'root');

if ($connection->connect_error)
 {
   die('Connection Failed' -$connection->connect_error);
} 
else
 {
   $stmt=$connection->prepare("insert into registration(name, gender, dob, address, city, state, zipcode, email, phone) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

   $stmt->bind_param("ssbsssisi", $name, $gender, $dob, $address, $city, $state, $zipcode, $email, $phone);

   $stmt->execute();

   echo "Joined Successfully";

   $stmt->close();
   $conn->close();


}

// if ($connection) {
//     echo "Connected";
// } else {
//     echo "Error Ocurred";
// }
?>