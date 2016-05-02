function expand() {
    document.getElementById('test').style.height="80%";
    document.getElementById('shopBar2').style.left="-95%";
}

function reduce() {
    document.getElementById('test').style.height="2.5%";
    document.getElementById('shopBar2').style.left="-87%";	
}

		/*Armor List in Order of Armor value
		#1:jungle
		#2:copper
		#3:iron
		#4:necro
		#5:silver
		#6:meteor
		#7:gold
		#8:molten
		#9:shadow*/
var screenHeight = screen.height;
var screenWidth = screen.width;
var x = '0';

function setArmValue(x) {
    document.getElementById('armid').textContent = "ARM"+x;
}

    if(screenHeight >= 1070)
    {
        function armour()
        {
            window.alert("alert");
            if(document.getElementById('armid').textContent == "ARM1")
            {
                //jungle
                document.getElementById('char1').style.clip="rect(27em,42em,50em,32em)";
                document.getElementById('char1').style.marginLeft="-33.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 10";
            }
            else if(document.getElementById('armid').textContent == "ARM2")
            {
                //copper
                document.getElementById('char1').style.clip="rect(6em,22em,27em,12em)";
                document.getElementById('char1').style.marginTop="-10em";
                document.getElementById('char1').style.marginLeft="-19.5em";
                document.getElementById('arm2').textContent="Armor: 20";
            }
            else if(document.getElementById('armid').textContent == "ARM3")
            {
                //iron
                document.getElementById('char1').style.clip="rect(6em,32em,27em,22em)";
                document.getElementById('char1').style.marginTop="-10em";
                document.getElementById('char1').style.marginLeft="-26.5em";
                document.getElementById('arm2').textContent="Armor: 30"
            }
            else if(document.getElementById('armid').textContent == "ARM4")
            {
                //necro
                document.getElementById('char1').style.clip="rect(27em,31em,50em,22em)";
                document.getElementById('char1').style.marginLeft="-26.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 40";
            }
            else if(document.getElementById('armid').textContent == "ARM5")
            {
                //silver
                document.getElementById('char1').style.clip="rect(6em,41em,27em,32em)";
                document.getElementById('char1').style.marginTop="-10em";
                document.getElementById('char1').style.marginLeft="-33em";
                document.getElementById('arm2').textContent="Armor: 50"
            }
            else if(document.getElementById('armid').textContent == "ARM6")
            {
                //meteor
                document.getElementById('char1').style.clip="rect(27em,12em,50em,0em)";
                document.getElementById('char1').style.marginLeft="-12.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 60";
            }
            else if(document.getElementById('armid').textContent == "ARM7")
            {
            //gold
                document.getElementById('char1').style.clip="rect(6em,52em,27em,42em)";
                document.getElementById('char1').style.marginTop="-10em";
                document.getElementById('char1').style.marginLeft="-40em";
                document.getElementById('arm2').textContent="Armor: 70"
            }
            else if(document.getElementById('armid').textContent == "ARM8")
            {
                //molten
                document.getElementById('char1').style.clip="rect(27em,52em,50em,42em)";
                document.getElementById('char1').style.marginLeft="-40.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 80";
            }
            else if(document.getElementById('armid').textContent == "ARM9")
            {
                //shadow
                document.getElementById('char1').style.clip="rect(27em,22em,50em,12em)";
                document.getElementById('char1').style.marginLeft="-20em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 90";
            }
        }
    }

    if(screenHeight>765 || screenHeight<1080)
    {
        function armour()
        {
            document.getElementById('char1').style.transform="scale(0.6)";
            if(document.getElementById('armid').textContent == "ARM1")
            {
                //jungle
                document.getElementById('char1').style.clip="rect(27em,42em,50em,32em)";
                document.getElementById('char1').style.marginLeft="-32em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 10";
            }
            else if(document.getElementById('armid').textContent == "ARM2")
            {
                //copper
                document.getElementById('char1').style.clip="rect(6em,22em,27em,12em)";
                document.getElementById('char1').style.marginTop="-12.5em";
                document.getElementById('char1').style.marginLeft="-21em";
                document.getElementById('arm2').textContent="Armor: 20";
            }
            else if(document.getElementById('armid').textContent == "ARM3")
            {
                //iron
                document.getElementById('char1').style.clip="rect(6em,32em,27em,22em)";
                document.getElementById('char1').style.marginTop="-12em";
                document.getElementById('char1').style.marginLeft="-27em";
                document.getElementById('arm2').textContent="Armor: 30"
            }
            else if(document.getElementById('armid').textContent == "ARM4")
            {
                //necro
                document.getElementById('char1').style.clip="rect(27em,31em,50em,22em)";
                document.getElementById('char1').style.marginLeft="-26.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 40";
            }
            else if(document.getElementById('armid').textContent == "ARM5")
            {
                //silver
                document.getElementById('char1').style.clip="rect(6em,41em,27em,32em)";
                document.getElementById('char1').style.marginTop="-12.5em";
                document.getElementById('char1').style.marginLeft="-32em";
                document.getElementById('arm2').textContent="Armor: 50"
            }
            else if(document.getElementById('armid').textContent == "ARM6")
            {
                //meteor
                document.getElementById('char1').style.clip="rect(27em,12em,50em,0em)";
                document.getElementById('char1').style.marginLeft="-14.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 60";
            }
            else if(document.getElementById('armid').textContent == "ARM7")
            {
                //gold
                document.getElementById('char1').style.clip="rect(6em,52em,27em,42em)";
                document.getElementById('char1').style.marginTop="-12.5em";
                document.getElementById('char1').style.marginLeft="-38em";
                document.getElementById('arm2').textContent="Armor: 70"
            }
            else if(document.getElementById('armid').textContent == "ARM8")
            {
                //molten
                document.getElementById('char1').style.clip="rect(27em,52em,50em,42em)";
                document.getElementById('char1').style.marginLeft="-38.5em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 80";
            }
            else if(document.getElementById('armid').textContent == "ARM9")
            {
                //shadow
                document.getElementById('char1').style.clip="rect(27em,22em,50em,12em)";
                document.getElementById('char1').style.marginLeft="-20em";
                document.getElementById('char1').style.marginTop="-25.5em";
                document.getElementById('arm2').textContent="Armor: 90";
            }
        }
    }