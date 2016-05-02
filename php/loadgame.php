<?php 
    $conn = new mysqli("localhost", "root", "", "saveDB");
    $uid = $_POST['userID'];
    $res = mysqli_query($conn, "SELECT * FROM newsave where username = '$uid'");
    if ($res->num_rows != 0) {
        $row = mysqli_fetch_row($res);
        echo json_encode($row);
    }
    else
        echo "Not Found!";
    $conn->close();
?>