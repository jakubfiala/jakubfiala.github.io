//stuff for my implementation of a video carousel
//only works with jquery, which I use all the time anyway
$("#carouselWrapper").hover(function(){
	$(".carouselNav").fadeIn();
}, function(){
	$(".carouselNav").fadeOut();
});

$(".carouselNav").click(function(){
	if ($(this).hasClass("right")) {
		if ($("#carouselWrapper").scrollLeft() < $("#carousel").width()-$("#carousel").find('.carouselItem').first().width() ) {
			$("#carouselWrapper").animate({
				scrollLeft: "+=810"
			}, 500);
		}
	}
	else {
		if ($("#carouselWrapper").scrollLeft() > $("#carousel").find('.carouselItem').first().width() ) {
			console.log("prd");
			$("#carouselWrapper").animate({
				scrollLeft: "-=810"
			}, 500);
		}

	}
});