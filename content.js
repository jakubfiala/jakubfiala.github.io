$( document ).ready(function() {
    var mode = "#home";
	var bio = "#bio";
	var sound = "#sound";
	var picture = "#picture";
	var space = "#space";
	var colors = ["#CC9009","#64FFEC","#FF8725","#09CC7D"];

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


	//CONTENT
	var path = $.fn.scrollPath("getPath", {scrollSpeed: 20});
	path.moveTo(dim.width/2,$("#_intro").position().top,{name: "_intro"});
	path.lineTo(dim.width/2,$("#_bio").position().top,{name: "_bio"});
	path.lineTo(dim.width/2,$("#_sound").position().top,{name: "_sound"});
	path.lineTo(dim.width/2,$("#_picture").position().top,{name: "_picture"});
	path.lineTo(dim.width/2,$("#_space").position().top,{name: "_space"});

	//initialize scrollpath
	$("#content").scrollPath({drawPath: false, wrapAround: false, scrollBar: false});

	//MENU----------------------------------------------------------------------------------
	//$("#content").height(dim.width + "px");
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
			mode = bio;
			$.fn.scrollPath("scrollTo","_bio");
		}
	});

	$("#sound").click(function(){ 
		if (mode != sound) { 
			$(mode).css("color","#000"); 
			$(this).css("color", "#64FFEC"); 
			mode = sound;
			$.fn.scrollPath("scrollTo","_sound");
		} 
	});

	$("#picture").click(function(){ 
		if (mode != picture) { 
			$(mode).css("color","#000"); 
			$(this).css("color", "#FF8725"); 
			mode = picture;
			$.fn.scrollPath("scrollTo","_picture");
		} 
	});

	$("#space").click(function(){ 
		if (mode != space) { 
			$(mode).css("color","#000"); 
			$(this).css("color", "#09CC7D"); 
			mode = space;
			$.fn.scrollPath("scrollTo","_space");
		} 
	});

	//INTRO
	var canvas = document.getElementById('animation');
	var ctx = canvas.getContext('2d');
	var countX = 0;
	var countY = 0;
	var size = 50;
	var forward = true;
	canvas.height = dim.height - 50;
	canvas.width = (Math.round(dim.width/(size*0.6)))*size*0.6 + size*0.6;

	function newTriangle(x,y) {
		ctx.fillStyle = colors[Math.floor(Math.random()*4)];
		posY = y*size;
		posX = x*size*0.6;
		ctx.beginPath();
		ctx.moveTo(posX,posY);
		ctx.lineTo(posX,posY+size);
		ctx.lineTo(posX+size*0.6,posY+size/2);
		ctx.lineTo(posX,posY);
		ctx.closePath();
		ctx.fill();
	}

	function revTriangle(x,y) {
		ctx.fillStyle = colors[Math.floor(Math.random()*4)];
		posY = y*size;
		posX = x*size*0.6;
		ctx.beginPath();
		ctx.moveTo(canvas.width-posX,canvas.height-posY+size/2+2);
		ctx.lineTo(canvas.width-posX-size*0.6,canvas.height-posY+1);
		ctx.lineTo(canvas.width-posX,canvas.height-posY-size/2);
		ctx.lineTo(canvas.width-posX,canvas.height-posY+size/2);
		ctx.closePath();
		ctx.fill();
	}

	setInterval(function(){
		countY = Math.round(Math.random()*Math.round(canvas.height/size));
		countX = Math.round(Math.random()*Math.round(canvas.width/(size*0.6)));
		if (forward) {
			newTriangle(countX,countY);
			forward = !forward;
		}
		else {
			revTriangle(countX,countY);
			forward = !forward;
		}
	}, 50);

});

