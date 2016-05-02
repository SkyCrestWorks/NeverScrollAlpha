$(document).ready(function () {
    $('#load').click(function (){
         $.ajax({
            type: "POST",
            url: "/php/loadgame.php",
            data: {userID : $.cookie('username')},
            success: function (data){
                console.log(data);
                if (data == "Not Found!") {
                    alert("No Save Game Exists");
                    $.cookie('flag', f);
                }
                else {
                    $.cookie('flag', "t");
                    $.cookie('data', data);
//                    alert(JSON.parse(data));
                    $(location).attr('href', '/game.html');
                }
             }
        });
    });
});

$(document).ready(function (){
    $('#new').click(function (){
        $.cookie('flag', 'f');
        $(location).attr('href', '/game.html');
    });
});


window.onload = function () {
    if ($.cookie("username") == null)
        $(location).attr('href', '/login.php');
}