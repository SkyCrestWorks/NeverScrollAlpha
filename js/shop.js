function activateShop()
{
	document.getElementById('shopBar2').style.left="0";
	document.getElementById('shopText').textContent="Close Shop"
}

function deactivateShop()
{
	document.getElementById('shopBar2').style.left="-87%";
	document.getElementById('shopText').textContent="Open Shop"
}