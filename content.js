var mode = "#home";
var bio = "#bio";
var sound = "#sound";
var picture = "#picture";
var space = "#space";

//GET SIZE–––––---------------------------------------------------------------------
	var dim = (function () {
		      var _pW, _pH;
		      if (document.body && document.body.offsetWidth) {
		        _pW = document.body.offsetWidth;
		        _pH = document.body.offsetHeight;
		      }
		      if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
		        _pW = document.documentElement.offsetWidth;
		        _pH = document.documentElement.offsetHeight;
		      }
		      if (window.innerWidth && window.innerHeight) {
		        _pW = window.innerWidth;
		        _pH = window.innerHeight;
		      }

		      return { width : _pW, height : _pH };
		    })();


//MENU----------------------------------------------------------------------------------
$("#content").height(dim.width + "px");
$("#head").hover(function(){ $(this).css("cursor","default");}, function(){ $(this).css("cursor","default");});
$(".menuitem").hover(function(){ $(this).css("cursor","pointer");}, function(){ $(this).css("cursor","default");});
$("#bio").hover(function(){ $(this).css("color", "#CC9009");}, function(){ if (mode != bio) { $(this).css("color","#000");} });
$("#sound").hover(function(){ $(this).css("color", "#64FFEC");}, function(){ if (mode != sound) { $(this).css("color","#000");} });
$("#picture").hover(function(){ $(this).css("color", "#FF8725");}, function(){ if (mode != picture) { $(this).css("color","#000");} });
$("#space").hover(function(){ $(this).css("color", "#09CC7D");}, function(){ if (mode != space) { $(this).css("color","#000");} });

$("#bio").click(function(){ 
	if (mode != bio) { 
		$(mode).css("color","#000"); 
		$(this).css("color", "#CC9009");
		$("_" + mode).animate({
			opacity:0
		}, 500)
		mode = bio;
		$("_" + mode).animate({
			opacity: 1
		}, 500);
	}
});

$("#sound").click(function(){ 
	if (mode != sound) { 
		$(mode).css("color","#000"); 
		$(this).css("color", "#64FFEC"); 
		$("_" + mode).animate({
			opacity:0
		}, 500)
		mode = sound;
		$("_" + mode).animate({
			opacity: 1
		}, 500);
	} 
});

$("#picture").click(function(){ 
	if (mode != picture) { 
		$(mode).css("color","#000"); 
		$(this).css("color", "#FF8725"); 
		$("_" + mode).animate({
			opacity:0
		}, 500)
		mode = picture;
		$("_" + mode).animate({
			opacity: 1
		}, 500);
	} 
});

$("#space").click(function(){ 
	if (mode != space) { 
		$(mode).css("color","#000"); 
		$(this).css("color", "#09CC7D"); 
		$("_" + mode).animate({
			opacity:0
		}, 500)
		mode = space;
		$("_" + mode).animate({
			opacity: 1
		}, 500);
	} 
});




