<html>
<head>
	<title>NeverScroll: Login</title>
    <script src="js/jqueryAPI.js" type="text/javascript"></script>
    <script src="js/jquery.cookie.js"type="text/javascript"></script>
    <script>
        window.onload = function () {
        $.removeCookie('username');
        }
    </script>
	<link rel="stylesheet" type="text/css" href="css/logstyle.css">
</head>
<body>
    
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = test_input($_POST["user"]);
    $pass = test_input($_POST["pass"]);
    set_time_limit(0);
    $conn = new mysqli("localhost", "root", "", "saveDB");
    $name = strtolower($name);
    $res = mysqli_query($conn, "SELECT * FROM users where username = '$name' && password = '$pass'");
    if ($res->num_rows != 0) {
        setcookie('username', $name, time() + (86400 * 30));
        header("Location: /land.html");
    }
    else {
        $nameerr= "Wrong Username or Password";
    }
    $conn->close();
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
	<div class="contents">
	<form method="post" action="login.php">
		<div class="innertext">
			Username: <input autofocus="autofocus" name="user" type="text" id="test">
		</div>
		<div class="innertext" style="height: 2em;">
			Password: <input name="pass" type="password">
		</div>
		<div style="display: block; position: absolute; right: 2%; top: 9.5em;">
		<span style="color:red;"><?php if (isset($nameerr)) echo $nameerr?></span>	<span style="font-size: 0.8em; top: 10em;">Don't have an account? <a href="register.php"><b>Register here</b></a>.</span>
		</div>
		<div class="innerbutton">
			<input class="innerbutton" type="submit" value="LOG IN">
		</div>
	</form>
	</div>
</div>
</body>
</html>