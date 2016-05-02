<?php
    $username = $_POST['username'];
    $exp = $_POST['exp'];
    $att = $_POST['att'];
    $hp = $_POST['hp'];
    $arm = $_POST['arm'];
    $potion = $_POST['potion'];
    $lvl = $_POST['lvl'];
    $killed = $_POST['killed'];
    $money = $_POST['money'];
    $iter = $_POST['iter'];
    $conn = new mysqli("localhost", "root", "", "saveDB");
    mysqli_query($conn, "DELETE from savegame where username = '$username'");
    mysqli_query($conn, "INSERT INTO savegame VALUES('$username','$exp','$att','$hp','$arm','$potion','$lvl','$killed','$money','$iter')");
    echo $iter;
    $conn->close();
?>