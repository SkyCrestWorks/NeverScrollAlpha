<html>
<head>
	<title>NeverScroll: Login</title>
	<link rel="stylesheet" type="text/css" href="css/logstyle.css">
</head>
<body>
<?php
    
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["userid"]);
    $pass = test_input($_POST["passid"]);
    $pass2 = test_input($_POST["passid2"]);
    if ($name == null)
        $error = "<br>Please Enter All The Fields";
    if ($pass == null)
        $error = "<br>Please Enter All The Fields";
    if ($pass2 == null) 
        $error = "<br>Please Enter All The Fields";
    if ($pass != $pass2 && !isset($error))
        $passerr = "<br>Password Are Not Same";
    else {
        $name = strtolower($name);
        $res = mysqli_query($conn, "SELECT * FROM savegame where username = '$uid'");
        if ($res->num_rows == 0) {
            $conn = new mysqli("localhost", "root", "", "saveDB");
        mysqli_query($conn, "INSERT INTO users VALUES ('$name', '$pass')");
        $conn->close();
        setcookie('username', $name, time() + (86400 * 30));
        header("Location: /land.html");
        }
        else {
            $error = "<br>Username Already Exists";
        }
    }
}
    
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
    
?>

<div class="container">
<span class="logo">EssenceCraft</span>
	<div class="contentsReg">
	<form method="post" action="register.php">
		<div class="innertext">
			Username: <input autofocus="autofocus" name="userid" id="userid" type="text">&nbsp|&nbsp;Password: <input name="passid" id="passid" type="password">&nbsp|&nbsp;Password Again: <input name="passid2" id="passid2" type="password">
		</div>
		<div style="display: block; position: absolute; right: 2%; top: 9.5em;">
		</div>
		<div class="innerbutton">
			<input class="innerbutton" type="submit" value="REGISTER">
            <span style="color:red;"><?php if (isset($passerr)) echo $passerr ?></span>
            <span style="color:red"><?php if (isset($error)) echo $error ?></span>
		</div>
	</form>
	</div>
</div>
</body>
</html>