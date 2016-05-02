//--------------------------------------------------Game Script--------------------------------------------------------

//-------------------------------------------Finishing Session On Refresh----------------------------------------------

window.onbeforeunload = function() {
    $.removeCookie('username', { path: '/' });
}


//--------------------------------------------Checking Session Validity------------------------------------------------

window.onload = function () {
    if ($.cookie("username") == null)
        $(location).attr('href', '/login.php');
    else {
        document.getElementById('uid').textContent = $.cookie('username');
        if ($.cookie('flag') == 't')
            load_game($.cookie('data'));
    }
}

//------------------------------------------------Global Variable------------------------------------------------------

var $iter = "", // --> Story ID
    exp = 0, // --> Current EXP
    att = 30, // --> Current Attack Points
    p_hp = 500, // --> Current HP
    arm = "0", // --> Armor Value
    height = $('#app').height(); // --> Log Window Height
    armv = 5, // --> Current Armor Points
    potion = 10, // --> Potion Count
    max_hp = 400 + 1*100;
    luck = 1, // --> Luck Points
    lvl = 1, // --> Current Level
    m_class = "0", // --> Monster Class
    max_lvl = 40; // --> Max Level
    exp_to_next = 1.6/(40 - 1) * 10000, // --> Exp to next level
    mosnter_killed = 0; // --> No of monsters killed
    money_count = 1000, // --> Ancient Money
    souls_hearts = 5,
    ember_stone = 5,
    defender = 5,
    shades_heart = 3,
    ashen_stone = 3,
    flag = false,
    flee_chance = 50,
    current = 1;

//------------------------------------------------Wallpaper Change-----------------------------------------------------

function wallpaper() {
    x = roll(9);
    while (x == current) {
        x = roll(9);
    }
    current = x;
    switch (x) {
        case 1:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/tavernnew.png')";
            break;
        case 2:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/taverndark.jpg')";
            break;
        case 3:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/darkgates.jpg')";
            break;
        case 4:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/Enchanted.jpg')";
            break;
        case 5:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/epicscene.jpg')";
            break;
        case 6:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/icegates.jpg')";
            break;
        case 7:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/illicraft.jpg')";
            break;
        case 8:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/kingblackdragon.jpg')";
            break;
        case 9:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/underwater.jpg')";
            break;
        case 10:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/woodelf.jpg')";
            break;
    }
}

function save_wallpaper(x) {
    switch (x) {
        case 1:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/tavernnew.png')";
            break;
        case 2:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/taverndark.jpg')";
            brea;
        case 3:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/darkgates.jpg')";
            break;
        case 4:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/Enchanted.jpg')";
            break;
        case 5:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/epicscene.jpg')";
            break;
        case 6:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/icegates.jpg')";
            break;
        case 7:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/illcraft.jpg')";
            break;
        case 8:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/kingblackdragon.jpg')";
            break;
        case 9:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/underwater.jpg')";
            break;
        case 10:document.getElementById('wall').style.backgroundImage="url('/css/images/scene/woodelf.jpg')";
            break;
    }
}

//------------------------------------------------Load Saved Game------------------------------------------------------

function load_game(data) {
    data = JSON.parse(data);
    $iter = String(data[9]);
    exp = parseInt(data[1],10);
    att = parseInt(data[2],10);
    p_hp = parseInt(data[3],10);
    arm = String(data[4]);
    potion = parseInt(data[5],10);
    lvl = parseInt(data[6],10);
    exp_to_next = 1.6/(max_lvl - lvl) * 10000;
    max_hp = 400+100*lvl;
    mosnter_killed = parseInt(data[7],10);
    money_count = parseInt(data[8],10);
    souls_hearts = parseInt(data[10],10);
    ember_stone = parseInt(data[11],10);
    defender = parseInt(data[12],10);
    shades_heart = parseInt(data[13],10);
    ashen_stone = parseInt(data[14],10);
    current = parseInt(data[15],10);
    $('#app').empty();
    save_wallpaper(current);
    $('#xx').show();
    $('#opt2').show();
    document.getElementById('1').textContent = souls_hearts + "/5";
    document.getElementById('2').textContent = ember_stone + "/5"; 
    document.getElementById('3').textContent = defender + "/5";
    document.getElementById('4').textContent = shades_heart + "/3";
    document.getElementById('5').textContent = ashen_stone + "/3";
    document.getElementById('lvlcount').textContent = lvl;
    document.getElementById('lvl').textContent = "LEVEL: " + lvl;
    document.getElementById('atk').textContent = "Attack: " + att;
    per_cal = (exp/exp_to_next)*100;
    document.getElementById('lvlprog').style.width = per_cal + "%";
    document.getElementById('monstercount').textContent = mosnter_killed;
    document.getElementById('moneycount').textContent = money_count;
    document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
    if (arm != 0) {
        setArmValue(arm);
        armour();
        armor_value(arm);
    }
    $.getJSON("json/story.json", function(result) {
        $.each(result.Story, function(i, field) {
            if($iter == field.id)
            {
                var n = $(field.text + "<br>").hide();  
                $("#app").append(n);                  
                n.show('slow');
                $('#app').animate({scrollTop: height}, 500);
                height += $('#app').height();
                document.getElementById('opt1').textContent=field.opt1;
                document.getElementById('opt2').textContent=field.opt2;
                document.getElementById('opt3').textContent=field.opt3;
                document.getElementById('opt4').textContent=field.opt4;
            }
        });
    });
}

//---------------------------------------------------Save Game---------------------------------------------------------

$(document).ready(function (){
    $('#gameSave').click(function (){
        $.ajax({
            type: "POST",
            url: "/php/savegame.php",
            data: { username : $.cookie("username"),exp : exp, att : att, hp : p_hp,arm : arm,potion : potion, lvl : lvl, killed : mosnter_killed, money : money_count, iter : $iter, souls_heart : souls_hearts, ember_stone : ember_stone, defender : defender, shades_heart : shades_heart, ashen_stone : ashen_stone, wall : current },
            success: function (data) {
                alert("Saved Successfully");
            }
        }); 
    });
});

//--------------------------------------------------Armor Value--------------------------------------------------------

function armor_val(ch) {
    switch (ch) {
        case '0':armv = 5;
            break;
        case '1':armv = 10;
            att += 10;
            break;
        case '2':armv = 20;
            att += 20;
            break;
        case '3':armv = 30;
            att += 30;
            break;
        case '4':armv = 40;
            att += 40;
            break;
        case '5':armv = 50;
            att += 50;
            break;
        case '6':armv = 60;
            att += 60;
            break;
        case '7':armv = 70;
            att += 70;
            break;
        case '8':armv = 80;
            att += 80;
            break;
        case '9':armv = 90;
            att += 90;
            break;
    }
    document.getElementById('atk').textContent = "Attack: " + att;
}

function armor_value(ch) {
    switch (ch) {
        case '0':armv = 5;
            break;
        case '1':armv = 10;
            break;
        case '2':armv = 20;
            break;
        case '3':armv = 30;
            break;
        case '4':armv = 40;
            break;
        case '5':armv = 50;
            break;
        case '6':armv = 60;
            break;
        case '7':armv = 70;
            break;
        case '8':armv = 80;
            break;
        case '9':armv = 90;
            break;
    }
    document.getElementById('atk').textContent = "Attack: " + att;
}


//-------------------------------------------------Exprience Calculator------------------------------------------------
function exp_calc(mexp) {
    exp += mexp;
    if (lvl != max_lvl) {
        if (exp >= exp_to_next) {
            lvl++;
            exp = exp - exp_to_next;
            exp_to_next = Math.ceil(1.6/(max_lvl - lvl) * 10000);
            att = 30+lvl*10;
            document.getElementById('atk').textContent = "Attack: " + att;
            document.getElementById('lvl').textContent = "LEVEL: " + lvl;
            document.getElementById('lvlcount').textContent = lvl;
            max_hp = 400+100*lvl;
            var n = $("<p style='color:#81bfd4'>Congrats, You Leveled Up!!!</p>").hide();  
            $("#app").append(n);                  
            n.show('slow');
            $('#app').animate({scrollTop: height}, 500);
            height += $('#app').height();
            p_hp = max_hp;
            document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
        }
        per_cal = (exp/exp_to_next)*100;
        if (lvl != max_lvl)
            document.getElementById('lvlprog').style.width = per_cal + "%";
        else
            document.getElementById('lvlprog').style.width = "100%";   
    }
}

//-------------------------------------------------Hiding Fight Options------------------------------------------------

$(document).ready(function (){
    $('#xx').hide();
    $('#load').hide();
    $('.bat').hide();
    $('#opt2').hide();
});

//----------------------------------------------------Roll a dice------------------------------------------------------

function roll(max) {
    return (Math.floor((Math.random() * max) + 1));
}

//---------------------------------------------------Damage Calculator------------------------------------------------

function damage(dd) {
    var m = dd/10*2+1;
    var n = roll(m);
    if (n < dd/10)
        return Math.floor(dd-n); // --> Decrease
    else if (n == (dd/10+1))
        return Math.floor(dd); // --> Normal
    else if (n == dd/10)
        return Math.floor(dd*2); // --> Critical
    else {
        n = n-dd/10;
        return Math.floor(dd+n); // --> Increase
    }
}

//----------------------------------------------------Random Encounter-------------------------------------------------

function random_encounter() {
    var m = roll(100); // --> dice no
    switch (luck) {
        case 1: if (m > 10)
            return true;
            else
                return false;
            break;
        case 2: if (m > 20)
            return true;
            else
                return false;
            break;
        case 3: if (m > 35)
            return true;
            else
                return false;
            break;
        case 4: if (m > 50)
            return true;
            else
                return false;
            break;
        case 5: if (m > 70)
            return true;
            else
                return false;
            break;
        case 6: if (m > 80)
            return true;
            else
                return false;
            break;
        default: if (m > 90)
            return true;
        else
            return false;
        break;    
    }
}

//------------------------------------------------Flee Chance Calculator-----------------------------------------------

function flee(armm, dmgm, hpm) {
    x = roll(100);
    if (x <= flee_chance)
        return true;
    else
        return false;
}

//-------------------------------------------------Monster ID Generator------------------------------------------------

function id_generator() {
    var n = Math.ceil(lvl/10);
    x = roll(10); // --> Determining Monster ID
    y = roll(100);
    switch (n) {
        case 1: m_class = "1";
            break;
        case 2:  // --> Determining Monster Class
            if (y > 50)
                m_class = "2";
            else
                m_class = "1";
            break;
        case 3: y = roll(100);
            if (y <= 25)
                m_class = "1";
            else if (y > 25 && y <= 50)
                m_class = "2";
            else
                m_class = "3";
            break;
        case 4: if (y <= 5)
                m_class = "1";
            else if (y > 5 && y <= 10)
                m_class = "2";
            else if (y > 10 && y <= 20)
                m_class = "3";
            else if (y > 20 && y <=95)
                m_class = "4";       
            else
                m_class = "5";
            break;
    }
    return String(x);
}

//-------------------------------------------------Story Fight Sequence------------------------------------------------

function fight(id) {
    var n = $("<p style='color:#ff8345;'>A Wild Encounter</p>").hide();  
    $("#app").append(n);                  
    n.show('slow');
    $('#app').animate({scrollTop: height}, 500);
    height += $('#app').height();
    $('.opt').hide(); // --> Hiding Story Options
    $('.bat').show('slow'); // --> Showing Battle Options
    $('#shopBar2').hide();
    $.getJSON("json/data.json", function(result) {
        $.each(result.Monsters, function(i, f) {
            if (f.id == id && f.prob == m_class) {
                var n = $(f.desc + "Hit Points: " + f.hp + "<br>").hide();  
                $("#app").append(n);                  
                n.show('slow');
                $('#app').animate({scrollTop: height}, 500);
                height += $('#app').height();
                var ms_hp = parseInt(f.hp,10);
                $('#opt5').bind("click", function () {
                    p = damage(att); // --> Random damage
                    m = damage(parseInt(f.dmg),10); // --> 
                    var dd = p - parseInt(f.amr,10); // --> Damage Dealt
                    if (dd < 0)
                        dd = 0;
                    ms_hp = ms_hp - dd; // --> Current Monster HP
                    var dt = m - armv; // --> Damage Taken
                    if (dt < 0)
                        dt = 0;
                    p_hp = p_hp - dt; // --> Current Player HP
                    if (p_hp < 0)
                        p_hp = 0;
                    sdd = String(dd);
                    sdt = String(dt);
                    temp = ((dt-dd)/dt)*100;
                    if (temp <= 5)
                        temp = 5;
                    flee_chance = temp;
                    document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
                    if (dd == (att*2 - parseInt(f.amr,10))) {
                        if (dt == (parseInt(f.dmg,10)*2 - armv)) {
                            var n = $("<p>You dealt <span style='color:orange;font-weight:bold;'>" + sdd + " damage</span> and took <span style='color:orange;font-weight:bold;'>" + sdt + " damage</span>" + "</p>").hide();
                        }
                        else {
                            var n = $("<p>You dealt <span style='color:orange;font-weight:bold;'>" + sdd + " damage</span> and took <span style='color:red;font-weight:bold;'>" + sdt + " damage</span>" + "</p>").hide();
                        }
                    }
                    else {
                        if (dt == (parseInt(f.dmg,10)*2 - armv)) {
                            var n = $("<p>You dealt <span style='color:red;font-weight:bold;'>" + sdd + " damage</span> and took <span style='color:orange;font-weight:bold;'>" + sdt + " damage</span>" + "</p>").hide();
                        }
                        else {
                            var n = $("<p>You dealt <span style='color:red;font-weight:bold;'>" + sdd + " damage</span> and took <span style='color:red;font-weight:bold;'>" + sdt + " damage</span>" + "</p>").hide();
                        }
                    }
                    $("#app").append(n);                 
                    n.show('slow');
                    $('#app').animate({scrollTop: height}, 500);
                    height += $('#app').height();
                    if (ms_hp <= 0 && p_hp <=0) {
                        mosnter_killed++;
                        money_count += parseInt(f.mon,10);
                        document.getElementById('monstercount').textContent = mosnter_killed;
                        document.getElementById('moneycount').textContent = money_count;
//                        var n = $("<h1>You both died<br>Game Over<h1>").hide();  
//                        $("#app").append(n);                  
//                        n.show('slow');
//                        $('#app').animate({scrollTop: height}, 500);
//                        height += $('#app').height();
                        $('#app').empty();
                        document.getElementById('app').style.backgroundImage="url('/css/images/giphy.gif')";
                        document.getElementById('app').style.backgroundSize="97% 130%";
                        $('.bat').hide(); // --> Hiding Battle Options
                        flag = true;
                        $('#load').show();
                    }
                    else if (ms_hp <= 0) { // --> Monster Dead
                        mosnter_killed++;
                        money_count += parseInt(f.mon,10);
                        document.getElementById('monstercount').textContent = mosnter_killed;
                        document.getElementById('moneycount').textContent = money_count;
                        $('#opt5').unbind(); // --> Unassigning battle keys
                        $('#opt6').unbind(); // --> Unassigning battle keys
                        $('#opt8').unbind();
                        var n = $("<p>You have slayed the monster<br><span style='color:#81bfd4;'>You continued on your journey and keep an eye out for enemies</span></p>" + "<br>").hide();  
                        $("#app").append(n);                  
                        n.show('slow');
                        $('#app').animate({scrollTop: height}, 500);
                        height += $('#app').height();
                        exp_calc(parseInt(f.exp,10));
                        if (random_encounter()) {
                            flee_chance = 50;
                            luck++;
                            fight(id_generator());
                        } 
                        else {
                            flee_count = 50;
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                  
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                            $('.opt').show('slow'); // --> Showing Story Options
                            $('.bat').hide(); // --> Hiding Battle Options
                            luck = 1;
                            $('#shopBar2').show();
                        }
                    }
                    if (p_hp <= 0  && flag == false) { // --> Player Dead GG
                        $('.bat').hide();
                        $('#shopBar2').hide();
                        $('#load').show();
                        $('#app').empty();
                        document.getElementById('app').style.backgroundImage="url('/css/images/giphy.gif')";
                        document.getElementById('app').style.backgroundSize="97% 130%";
                    }
                });
                $('#opt6').bind("click", function () {
                    if (potion == 0) {
                        var n = $("<p style='color:red;font-weight:bold;'>No Potion left</p>").hide();
                        $("#app").append(n);                 
                        n.show('slow');
                        $('#app').animate({scrollTop: height}, 500);
                    }
                    else {
                        potion -= 1;
                        healed = Math.floor(25/100*max_hp);
                        temp = p_hp;
                        p_hp = p_hp + Math.floor(25/100*max_hp);
                        if (p_hp > max_hp) {
                            p_hp = max_hp;
                            healed = max_hp - temp;
                        }
                        m = damage(parseInt(f.dmg),10);
                        var dt = m - armv;
                        if (dt < 0)
                            dt = 0;
                        p_hp = p_hp - dt;
                        if (p_hp < 0)
                            p_hp = 0;
                        sdt = String(dt);
                        document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
                        var n = $("<p>You healed <span style='color:green;font-weight:bold;'>" + healed + "HP</span> and took <span style='color:red;font-weight:bold;'>" + sdt + " damage</span> </p><p><span style='color:blue;font-weight:bold;'>" + potion + " Potion(s)</span> left</P>").hide();
                        $("#app").append(n);                 
                        n.show('slow');
                        $('#app').animate({scrollTop: height}, 500);
                        height += $('#app').height();
                        if (p_hp == 0){
                            $('#app').empty();
                            document.getElementById('app').style.backgroundImage="url('/css/images/giphy.gif')";
                            document.getElementById('app').style.backgroundSize="97% 130%";
                            $('.bat').hide();
                        }
                    }
                });
                $('#opt8').bind("click", function () {
                    flag = flee(f.amr, f.dmg, f.hp);
                    if (flag == true) {
                        var n = $("<p>You ran away successfully...</p>" + "<br>").hide();  
                        $("#app").append(n);                   
                        n.show('slow');
                        $('#app').animate({scrollTop: height}, 500);
                        height += $('#app').height();
                        flee_chance = 50;
                        $('#opt5, #opt6, #opt8').unbind(); // --> Unassigning battle keys
                        if (random_encounter()) {
                            luck++;
                            fight(id_generator());
                        } 
                        else {
                            $('#opt5, #opt6, #opt8').unbind(); // --> Unassigning battle keys
                            $('.opt').show('slow'); // --> Showing Story Options
                            $('.bat').hide(); // --> Hiding Battle Options
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                   
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                            $('#shopBar2').show();
                        }
                    }
                    else {
                        m = damage(parseInt(f.dmg),10); // --> 
                        var dt = m - armv; // --> Damage Taken
                        if (dt < 0)
                            dt = 0;
                        p_hp = p_hp - dt;
                        if (p_hp < 0)
                            p_hp = 0;
                        sdt = String(dt);
                        document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
                        if (dt == (parseInt(f.dmg,10)*2 - armv))
                            var n = $("<p>You failed to flee and took <span style='color:orange;font-weight:bold;'>" + sdt +" Damage</span></p>").hide();  
                        else
                            var n = $("<p>You failed to flee and took <span style='color:red;font-weight:bold;'>" + sdt +" Damage</span></p>").hide();  
                        $("#app").append(n);                   
                        n.show('slow');
                        $('#app').animate({scrollTop: height}, 500);
                        height += $('#app').height();
                        if (p_hp <= 0) {
                            $('#app').empty();
                            document.getElementById('app').style.backgroundImage="url('/css/images/giphy.gif')";
                            document.getElementById('app').style.backgroundSize="97% 130%";
                            $('.bat').hide();
                            $('#shopbar2').hide();
                            $('#load').show();
                        }
                    }
                }); 
            } 
        });
    });
    
}


//-------------------------------------------------Option 1 Event Handler------------------------------------------------

$(document).ready(function () {
    $("#opt1").click(function () {
        $('#xx').show();
        $('#opt2').show();
        $iter = $iter.concat("1");
        $.getJSON("json/story.json", function(result) {
            $.each(result.Story, function(i, field) {
                if($iter == field.id)
                {
                    var n = $(field.text + "<br>").hide();  
                    $("#app").append(n);                  
                    n.show('slow');
                    $('#app').animate({scrollTop: height}, 500);
                    height += $('#app').height();
                    if(field.type == "w") // --> Wilderness
                    {
                        if (random_encounter())
                        {
                            luck++;
                            fight(id_generator());                          
                        }
                        else {
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                   
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                        }
                    }
                    document.getElementById('opt1').textContent=field.opt1;
                    document.getElementById('opt2').textContent=field.opt2;
                    document.getElementById('opt3').textContent=field.opt3;
                    document.getElementById('opt4').textContent=field.opt4;
                    if (field.end == "yes") {
                        len = $iter.length - 1;
                        temp = Math.floor(parseInt($iter,10)/(Math.pow(10,len)));
                        $iter = String(temp + 1);
                    }
                    if (field.end == "fin") {
                        $('.opt').hide();
                        money_count += 10000;
                        document.getElementById('moneycount').textContent = money_count;
                    }
                }
            });
        });
    });
});

//-------------------------------------------------Option 2 Event Handler------------------------------------------------

$(document).ready(function () {
    $("#opt2").click(function () {
        $iter = $iter.concat("2");
        $.getJSON("json/story.json", function(result) {
            $.each(result.Story, function(i, field) {
                if($iter == field.id)
                {
                    var n = $(field.text + "<br>").hide();  
                    $("#app").append(n);                   
                    n.show('slow');
                    $('#app').animate({scrollTop: height}, 500);
                    height += $('#app').height();
                    if(field.type == "w")
                    {
                        if (random_encounter())
                        {
                            luck++;
                            fight(id_generator());                          
                        }
                        else {
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                   
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                        }
                    }
                    document.getElementById('opt1').textContent=field.opt1;
                    document.getElementById('opt2').textContent=field.opt2;
                    document.getElementById('opt3').textContent=field.opt3;
                    document.getElementById('opt4').textContent=field.opt4;
                    if (field.end == "yes") {
                        len = $iter.length - 1;
                        temp = Math.floor(parseInt($iter,10)/(Math.pow(10,len)));
                        $iter = String(temp + 1);
                    }
                    if (field.end == "fin") {
                        $('.opt').hide();
                        money_count += 10000;
                        document.getElementById('moneycount').textContent = money_count;        
                    }
                }
            });
        });
    });
});

//-------------------------------------------------Option 3 Event Handler------------------------------------------------

$(document).ready(function () {
    $("#opt3").click(function () {
        $iter = $iter.concat("3");
        $.getJSON("json/story.json", function(result) {
            $.each(result.Story, function(i, field) {
                if($iter == field.id)
                {
                    var n = $(field.text + "<br>").hide();  
                    $("#app").append(n);                   
                    n.show('slow');
                    $('#app').animate({scrollTop: height}, 500);
                    height += $('#app').height();
                    if(field.type == "w")
                    {
                        if (random_encounter())
                        {
                            luck++;
                            fight(id_generator());                          
                        }
                        else {
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                   
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                        }
                    }
                    document.getElementById('opt1').textContent=field.opt1;
                    document.getElementById('opt2').textContent=field.opt2;
                    document.getElementById('opt3').textContent=field.opt3;
                    document.getElementById('opt4').textContent=field.opt4;
                    if (field.end == "yes") {
                        len = $iter.length - 1;
                        temp = Math.floor(parseInt($iter,10)/(Math.pow(10,len)));
                        $iter = String(temp + 1);
                    }
                    if (field.end == "fin") {
                        $('.opt').hide();
                        money_count += 10000;
                        document.getElementById('moneycount').textContent = money_count;
                    }
                }
            });
        });
    });
});

//-------------------------------------------------Option 4 Event Handler------------------------------------------------

$(document).ready(function () {
    $("#opt4").click(function () {
        $iter = $iter.concat("4");
        $.getJSON("json/story.json", function(result) {
            $.each(result.Story, function(i, field) {
                if($iter == field.id)
                {
                    var n = $(field.text + "<br>").hide();  
                    $("#app").append(n);                   
                    n.show('slow');
                    $('#app').animate({scrollTop: height}, 500);
                    height += $('#app').height();
                    if(field.type == "w")
                    {
                        if (random_encounter())
                        {
                            luck++;
                            fight(id_generator());                          
                        }
                        else {
                            var n = $("<p style='color:#93eb71;font-weight:bold;'>You survived the wilderness!!!</p>" + "<br>").hide();  
                            $("#app").append(n);                   
                            n.show('slow');
                            $('#app').animate({scrollTop: height}, 500);
                            height += $('#app').height();
                        }
                    }
                    document.getElementById('opt1').textContent=field.opt1;
                    document.getElementById('opt2').textContent=field.opt2;
                    document.getElementById('opt3').textContent=field.opt3;
                    document.getElementById('opt4').textContent=field.opt4;
                    if (field.end == "yes") {
                        len = $iter.length - 1;
                        temp = Math.floor(parseInt($iter,10)/(Math.pow(10,len)));
                        $iter = String(temp + 1);
                    }
                    if (field.end == "fin") {
                        $('.opt').hide();
                        money_count += 10000;
                        document.getElementById('moneycount').textContent = money_count;
                    }
                }
            });
        });
    });
});

//-----------------------------------------------------Potion Button-----------------------------------------------------

$(document).ready(function () {
   $('#potDrink').click(function () {
       if (potion == 0) {
           var n = $("<p style='color:red;font-weight:bold;'>No Potions Left</p>").hide();  
           $("#app").append(n);                   
           n.show('slow');
           $('#app').animate({scrollTop: height}, 500);
           height += $('#app').height();
       }
       else {
           potion -= 1;
           healed = Math.floor(25/100*max_hp);
           temp = p_hp;
           p_hp = p_hp + Math.floor(25/100*max_hp);
           if (p_hp > max_hp) {
               p_hp = max_hp;
               healed = max_hp - temp
           }
           document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
           var n = $("<p>You healed <span style='color:green;font-weight:bold;'>" + healed + "HP</span></p><p><span style='color:blue;font-weight:bold;'>" + potion + " Potion(s)</span> left</P>").hide();
           $("#app").append(n);                 
           n.show('slow');
           $('#app').animate({scrollTop: height}, 500);
           height += $('#app').height();
       }
   }); 
});

//--------------------------------------------------------Buy Armor---------------------------------------------------------------

$(document).ready(function () {
    $('#buy1').click(function () {
        if (arm == 1)
            alert("You already own this armor");
        else if (money_count >= 5000) {
            arm = 1
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 5000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy2').click(function () {
        if (arm == 2)
            alert("You already own this armor");
        else if (money_count >= 20000) {
            arm = 2
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 20000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy3').click(function () {
        if (arm == 3)
            alert("You already own this armor");
        else if (money_count >= 50000) {
            arm = 3
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 50000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy4').click(function () {
        if (arm == 4)
            alert("You already own this armor");
        else if (money_count >= 75000) {
            arm = 4
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 75000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy5').click(function () {
        if (arm == 5)
            alert("You already own this armor");
        else if (money_count >= 10000) {
            arm = 5
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 100000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy6').click(function () {
        if (arm == 6)
            alert("You already own this armor");
        else if (money_count >= 150000) {
            arm = 6
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 150000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy7').click(function () {
        if (arm == 7)
            alert("You already own this armor");
        else if (money_count >= 200000) {
            arm = 7
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 200000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy8').click(function () {
        if (arm == 8)
            alert("You already own this armor");
        else if (money_count >= 300000) {
            arm = 8
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 300000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

$(document).ready(function () {
    $('#buy9').click(function () {
        if (arm == 9)
            alert("You already own this armor");
        else if (money_count >= 400000) {
            arm = 9
            setArmValue(arm);
            armour();
            armor_val(arm);
            money_count = money_count - 400000;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    })
});

//---------------------------------------------------Buy Potions------------------------------------------------------------

$(document).ready(function () {
    $('#buyPot').click(function (){
        if (money_count >= 500) {
            potion += 1;
            money_count -= 500;
            document.getElementById('moneycount').textContent = money_count;
        }
        else {
            alert("Not Enough Money");
        }
    });
});

//------------------------------------------------Back To Login Screen-------------------------------------------------------

$(document).ready(function () {
    $('#opt7').click(function (){
        $(location).attr('href', '/login.php');
    });
});

//----------------------------------------------------Souls Heart-------------------------------------------------------------

$(document).ready(function () {
    $('#buyU1').click(function (){
        if (souls_hearts == 0) {
            alert("Out of Stock");
        }
        else if (money_count < 50000){
            alert("Not Enough Money");
        }
        else {
            souls_hearts -= 1;
            document.getElementById('1').textContent = souls_hearts + "/5";
            temp = Math.floor(max_hp/10);
            p_hp += temp;
            max_hp = max_hp + temp;
            document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
            money_count -= 50000;
            document.getElementById('moneycount').textContent = money_count;
        }
    });
});

$(document).ready(function () {
    $('#buyU2').click(function (){
        if (ember_stone == 0) {
            alert("Out of Stock");
        }
        else if (money_count < 50000){
            alert("Not Enough Money");
        }
        else {
            ember_stone -= 1;
            att += Math.floor(att/10);
            document.getElementById('2').textContent = ember_stone + "/5";
            money_count -= 50000;
            document.getElementById('moneycount').textContent = money_count;
            document.getElementById('atk').textContent = "Attack: " + att;
        }
    });
});

$(document).ready(function () {
    $('#buyU3').click(function (){
        if (defender == 0) {
            alert("Out of Stock");
        }
        else if (money_count < 60000){
            alert("Not Enough Money");
        }
        else {
            defender -= 1;
            att += Math.floor(att/20);
            temp = Math.floor(max_hp/20);
            p_hp += temp;
            max_hp = max_hp + temp;
            document.getElementById('3').textContent = defender + "/5";
            document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
            document.getElementById('atk').textContent = "Attack: " + att;
            money_count -= 60000;
            document.getElementById('moneycount').textContent = money_count;
        }
    });
});

$(document).ready(function () {
    $('#buyU4').click(function (){
        if (shades_heart == 0) {
            alert("Out of Stock");
        }
        else if (money_count < 100000){
            alert("Not Enough Money");
        }
        else {
            att += Math.floor(att/5);
            temp = Math.floor(max_hp/5);
            p_hp -= temp;
            max_hp -= temp;
            shades_heart -= 1;
            document.getElementById('4').textContent = shades_heart + "/3";
            money_count -= 100000;
            document.getElementById('moneycount').textContent = money_count;
            document.getElementById('atk').textContent = "Attack: " + att;
            document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
        }
    });
});

$(document).ready(function () {
    $('#buyU5').click(function (){
        if (ashen_stone == 0) {
            alert("Out of Stock");
        }
        else if (money_count < 100000){
            alert("Not Enough Money");
        }
        else {
            ashen_stone -= 1;
            att -= Math.floor(att/10);
            document.getElementById('5').textContent = ashen_stone + "/3";
            temp = Math.floor(max_hp/5);
            p_hp += temp;
            max_hp += temp;
            document.getElementById('atk').textContent = "Attack: " + att;
            document.getElementById('hp').textContent="Health: " + p_hp + "/" + max_hp;
            money_count -= 100000;
            document.getElementById('moneycount').textContent = money_count;
        }
    });
});

$(document).ready(function () {
    $('#buyU6').click(function (){
        if (money_count < 10000)
            alert("Not Enough Money");
        else {
            money_count -= 10000;
            wallpaper();
            document.getElementById('moneycount').textContent = money_count;
        }
    });
});