<?php
$connection = mysqli_connect('localhost', 'root');

if ($connection) {
    echo "Connected";
} else {
    echo "Error Ocurred";
}
?>