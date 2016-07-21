/*
	STATIC NOISE ANIMATION GENERATOR
	by Jakub Fiala
	fiala.uk
	Licensed under the Don't Be a Dick License
	http://www.dbad-license.org

	This is cool because it's very optimized. Using requestAnimationFrame, we only calculate new noise
	when the browser needs us to.

	Also, we use a hidden utility canvas to first calculate a small chunk
	of noise, and then copy it around the main canvas with drawImage. This turns out to be a lot faster than just generating the image data and calling putImageData many times.

	Lastly, we set a "pulse" value in Hz, which determines how many times per second we'll call requestAnimationFrame.
	This helps because rAF is usually called way too often, so we can relieve the browser of rendering too much stuff.

	grainSize++ || divisions++ || pulse++ === faster performance === shittier looks

	configure with care.

	DEPENDENCIES: none, vanilla js baby.

*/


// set the globals
var grainSize = 4 //in pixels
var divisions = 4
var brightness = 0.43 //fraction of 1
var pulse = 25 //in Hz
var mainCanvasId = "grain"
var utilityCanvasId = "grain-block"

//create the main canvas context, and a utility "block" context for writing in the pixels
var canvas = document.getElementById(mainCanvasId);
var c = canvas.getContext('2d');
var gb = document.getElementById(utilityCanvasId);
gb.style.display = "none";
var gbc = gb.getContext('2d');

//set context dims
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
gb.width = window.innerWidth/divisions;
gb.height = window.innerHeight/divisions;

//initialize what we need: grain size -x-scaled to DPR-x-, brightness scaled to UInt8, pixel container, and the increment for positioning blocks
// grainSize = Math.floor(grainSize*window.devicePixelRatio);
brightness = brightness*255;
var imageData = c.createImageData(window.innerWidth/divisions, window.innerHeight/divisions);
var increment = 1/divisions;

//this is the main loop
var renderGrain = function() {
	if (staticOn) {
		//create random pixel data, scaled by brightness value
		for (var i = 0; i < imageData.data.length; i += grainSize) {
			var n = Math.round(Math.random()*brightness);
			for (var j = 0; j < grainSize; j++) {
				imageData.data[i+j] = n;
			}
		}

		//clear the main context
		c.clearRect(0, 0, canvas.width, canvas.height);

		//put pixels on the utility context
		gbc.putImageData(imageData,0,0)

		//draw on the main context
		//drawImage is much faster than putImageData
		for(var x = 0; x < 1; x += increment)
			for (var y = 0; y < 1; y += increment)
				c.drawImage(gb, window.innerWidth*x, window.innerHeight*y);

		//wait for 1s / [pulse]Hz, to give the renderer a break
		setTimeout(function(){ requestAnimationFrame(renderGrain); }, 1000/pulse);
	}
};

window.onresize = function() {
	//recalculate dimensions
	grainSize = Math.floor(grainSize*window.devicePixelRatio)
	imageData = c.createImageData(window.innerWidth/divisions, window.innerHeight/divisions);
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	gb.width = window.innerWidth/divisions;
	gb.height = window.innerHeight/divisions;
}
