var NINCtWeeker = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
var NINCtColors = new Array('#FFC0CB', '#888', '#888', '#888', '#888', '#888', '#66DDFF');
var NINCtCounterSection = document.getElementById("NINCtCounterSection");
var NINCtImageSection = document.getElementById("NINCtImageSection");
var NINCtDrawSection = document.getElementById("NINCtDrawSection");
var NINCtCMSection =  document.getElementById("NINCtCMSection");
var NINCtGraphSection =  document.getElementById("NINCtGraphSection");
var NINCtHiddenTimer;
var NINCtDrawd = false;
var BorderLength = 2;
function NINCtDraw() {
	
	if (!NINCtDrawd) {
		
		switch(NINCtGraphType) {
			case "0": NINCtDrawDayGraph(); break;
			case "1": NINCtDrawWeekGraph(); break;
			case "2": NINCtGraphSection.style.display = "none"; break;
		}
		NINCtDrawSection.style.visibility = "hidden";
		NINCtDrawSection.style.display = "";
		NINCtDrawSection.style.visibility = "visible";
		NINCtDrawSection.style.position = "fixed";
		NINCtDrawd = true;
	}
	var dcWidth = document.documentElement.clientWidth;
	var dcHeight = document.documentElement.clientHeight;
	var imLeft =  NINCtImageSection.getBoundingClientRect().left;
	var imWidth =  NINCtImageSection.offsetWidth;
	var imCenter = imLeft + imWidth / 2;
	var imTop =  NINCtImageSection.getBoundingClientRect().top;
	var imBottom =  NINCtImageSection.getBoundingClientRect().bottom;
	var imHeight =  NINCtImageSection.offsetHeight;
	var imMiddle = imTop + imHeight / 2;
	NINCtDrawSection.style.display = "";
	if(dcWidth / 2 > imCenter  ){
		NINCtDrawSection.style.left = imLeft + "px";
	}else{
		NINCtDrawSection.style.left = (imLeft - (NINCtDrawSection.offsetWidth - imWidth)) + "px";
	}
	if(imTop < NINCtDrawSection.offsetHeight || dcHeight / 2 > imMiddle){
		NINCtDrawSection.style.top = imBottom + "px";
	}else{
		NINCtDrawSection.style.top = (imTop - NINCtDrawSection.offsetHeight ) + "px";
	}
	
}

function NINCtHidden() { NINCtDrawSection.style.display = "none"; }

function NINCtDrawDayGraph() {
	if (NINCtGraphSection.innerHTML == "") {
		var style = 'display:inline-block; width:145px; margin:0px 0 3px 1px; background: #FAFAFA; padding: 5px 0; border: 1px solid #EDEDED; font-family: Arial,&quot;メイリオ&quot;,sans-serif;font-size: 13px';
		NINCtGraphSection.innerHTML = ''
		+ '<dl style="'+style+'"><dt style="font-weight:bold; float:left; padding:0 0 0 5px;">今日:</dt><dd style="margin: 0 0 0 3px; float: left;">'+NINCtCount[0]+'</dd></dl>'
		+ '<dl style="'+style+'"><dt style="font-weight:bold; float:left; padding:0 0 0 5px;">昨日:</dt><dd style="margin: 0 0 0 3px; float: left;">'+NINCtCount[1]+'</dd></dl>'
		+ '';
	}
}

function NINCtDrawWeekGraph() {
	if (NINCtGraphSection.innerHTML == "") {
		var maxCount = 0;
		for (var index = 0 ; index < 7 ; index++) {
			if (NINCtCount[index] > maxCount) maxCount = NINCtCount[index];
		}
		var html = '';
		
		html = '<div style="width: 297px; height: 60px; padding: 17px 0 20px 5px; text-align: center; ">';
		
		for (var index = 6 ; index >= 0 ; index--) {
			var height = Math.floor((NINCtCount[index] * 100) /  maxCount);
			var targetDate = new Date();
			targetDate.setTime((new Date()).getTime() - 24 * 60 * 60 * index * 1000);
			
			html += '';
			html += '<dl style="float: left; width: 12%; height: 100%; margin: 1px 2px 3px 2px; background: #F5F5F5; padding: 5px 0; border: 1px solid #FFF; position: relative;font-family: Arial,&quot;メイリオ&quot;,sans-serif;font-size: 13px">'
			html += '<dt style="width: 100%; font-weight: bold; position: absolute; top: -16px; color: ' + NINCtColors[targetDate.getDay()] + ';left :0;">' + NINCtWeeker[targetDate.getDay()] + '</dt>'
			html += '<dd style="width: 100%; height:'+height+'%; margin: 0; background: #BBDDFF; position: absolute; bottom: 0;left :0;"></dd>'
			html += '<dd style="width: 100%; margin: 0; text-align: center; position: absolute; z-index: 99;left :0;">' + NINCtCount[index] + '</dd>'
			html += '</dl>';
		}
		html += '</div>';
		NINCtGraphSection.innerHTML += html;
	}
}

if (window.attachEvent) {
	NINCtImageSection.detachEvent("onmouseover", NINCtMouseOverListener);
	NINCtCounterSection.attachEvent("onmouseover", NINCtDraw);
	NINCtCounterSection.attachEvent("onmouseout", NINCtHidden);
} else {
	NINCtImageSection.removeEventListener("mouseover", NINCtMouseOverListener, false);
	NINCtCounterSection.addEventListener("mouseover", function() { clearTimeout(NINCtHiddenTimer); NINCtDraw(); } , false);
	NINCtCounterSection.addEventListener("mouseout", function() { NINCtHiddenTimer = setTimeout(NINCtHidden, 100); } , false);
}

NINCtDraw();
