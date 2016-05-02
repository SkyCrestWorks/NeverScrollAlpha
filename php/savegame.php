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
    $souls = $_POST['souls_heart'];
    $ember = $_POST['ember_stone'];
    $def = $_POST['defender'];
    $shades = $_POST['shades_heart'];
    $ashen = $_POST['ashen_stone'];
    $wall = $_POST['wall'];
    $conn = new mysqli("localhost", "root", "", "saveDB");
    mysqli_query($conn, "DELETE from newsave where username = '$username'");
    mysqli_query($conn, "INSERT INTO newsave VALUES('$username','$exp','$att','$hp','$arm','$potion','$lvl','$killed','$money','$iter','$souls','$ember','$def','$shades','$ashen','$wall')");
    echo $iter;
    $conn->close();
?>