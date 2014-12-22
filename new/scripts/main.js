var init = function() {

	//init containers
	$("#main").css({ width: $(window).width(), height: $(window).height() });
	$("#wrapper").css({ width: 610, height: $(window).height()});
	$("#view").css({ width: $(window).width()-620, height: $(window).height() });

	var HOME_ID = "home";
	var curPageId = HOME_ID;

	$("body").fadeIn();
	$("#" + curPageId + "Content").fadeIn();

	$(".menuitem").css({ opacity: 0.3 }).each(function() {
		//handle hover
		 {
			$(this).hover(function() {
				if($(this).attr("id") != curPageId) {
					$(this).animate({ opacity: 1.0 }, 100);
				}
				$("#" + $(this).attr("id") + " > .slide").animate({width:'toggle'},{
					duration: 200,
					progress: function(promise, prog, rem){
						//$("#menu").css({ left: -prog*100 });
					}
				});
			}, function() {
				if($(this).attr("id") != curPageId) {
					$(this).animate({ opacity: 0.3 }, 100);
				}
				$("#" + $(this).attr("id") + " > .slide").animate({width:'toggle'},{
					duration: 200,
					complete: function(promise, prog, rem){
						//$("#menu").animate({ left: 0 }, 200);
					}
				});
			});
		}
		//handle click
		$(this).click(function(){
			var prevPageId = curPageId;
			curPageId = $(this).attr("id");
			$(".menuitem").each(function(){
				if ($(this).attr("id") != curPageId) {
					$(this).animate({ opacity: 0.3 }, 100);
				}
			});
			$(this).animate({ opacity: 1.0 }, 100);

			$("#" + prevPageId + "Content").fadeOut(function(){
				$("#" + curPageId + "Content").fadeIn();
			});
		})

	});


	$("#" + curPageId).css({ opacity: 1.0 });


	//intro
	var colors = ["#CC9009","#64FFEC","#FF8725","#09CC7D"];

	var canvas = document.getElementById('animation');
	var ctx = canvas.getContext('2d');
	var countX = 0;
	var countY = 0;
	var size = 50;
	var forward = true;
	canvas.height = $("#view").height();
	canvas.width = (Math.round($("#view").width()/(size*0.6)))*size*0.6 + size*0.6;

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

	setTimeout(function(){
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
	}, 1000);
}

document.body.onload = init;