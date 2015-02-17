$( document ).ready(function() {
    var mode = "#home";
	var bio = "#bio";
	var sound = "#sound";
	var software = "#software";
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

	$("body").width(dim.width);
	$("#content").width(dim.width);
	$("header").width(dim.width);


	//CONTENT
	var items = ["#bio","#sound","#software","#space"];
	var colours = ["#CC9009","#64FFEC","#FF8725","#09CC7D"];

	//MENU----------------------------------------------------------------------------------
	$("#head").hover(function(){ $(this).css("cursor","default");}, function(){ $(this).css("cursor","default");});
	$(".menuitem").hover(function(){ $(this).css("cursor","pointer");}, function(){ $(this).css("cursor","default");});
	$("#home").hover(function(){ $(this).css("cursor","pointer");}, function(){ $(this).css("cursor","default");});
	$(bio).hover(function(){ $(this).css("color", "#CC9009");}, function(){ if (mode != bio) { $(this).css("color","#000");} });
	$(sound).hover(function(){ $(this).css("color", "#64FFEC");}, function(){ if (mode != sound) { $(this).css("color","#000");} });
	$(software).hover(function(){ $(this).css("color", "#FF8725");}, function(){ if (mode != software) { $(this).css("color","#000");} });
	$(space).hover(function(){ $(this).css("color", "#09CC7D");}, function(){ if (mode != space) { $(this).css("color","#000");} });

	$(".menuitem").each(function() {
		var id = "#_" + $(this).attr("id");
		console.log(id);
		$(this).click(function(){ $("html, body").animate({ scrollTop: ($(id).offset().top-200) },500); });
	})

	$("#home").click(function() { $("html, body").animate({ scrollTop: 0 },500); });

	$(document).scroll(function() {
		if ($(document).scrollTop() < ($("#_bio").offset().top-200)) {
			$(".menuitem").css("color", "#000000");
			mode = "#home";
		}
		else {
			if ($(document).scrollTop() < ($("#_sound").offset().top-200)) {
				$(mode).css("color","#000000");
				$(bio).css("color", "#CC9009");
				mode = bio;
			}
			else {
				if ($(document).scrollTop() < ($("#_software").offset().top-200)) {
					$(mode).css("color","#000000");
					$(sound).css("color", "#64FFEC");
					mode = sound;
				}
				else {
					if ($(document).scrollTop() < ($("#_space").offset().top-200)) {
						$(mode).css("color","#000000");
						$(software).css("color", "#FF8725");
						mode = software;
					}
					else {
						$(mode).css("color","#000000");
						$(space).css("color", "#09CC7D");
						mode = space;
					}
				}
			}
		}
	});





	//INTRO
	var canvas = document.getElementById('animation');
	var ctx = canvas.getContext('2d');
	var countX = 0;
	var countY = 0;
	var size = 50;
	var forward = true;
	canvas.height = dim.height;
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
		ctx.moveTo(canvas.width-posX,canvas.height-posY+size/2);
		ctx.lineTo(canvas.width-posX-size*0.6,canvas.height-posY);
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

