var xPos=0;
var yPos=0;
var faceW=0;
var faceH=0;
function setup() {
	createCanvas(windowWidth, windowHeight);
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var tracker = new tracking.ObjectTracker('face');
	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	tracking.track('#video', tracker, {
		camera: true
	});
	tracker.on('track', function(event) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		event.data.forEach(function(rect) {
			xPos=rect.x;
			yPos=rect.y;
			faceW=rect.width;
			faceH=rect.height;
			context.strokeStyle = '#a64ceb';
			context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			// context.font = '11px Helvetica';
			// context.fillStyle = "#fff";
			// context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
			// context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
		});
	});
}

function draw() {
	//background(0);
	noFill();
	strokeWeight(2);
	stroke(random(0,255),random(0,255),random(0,255));
	rect(xPos,yPos,faceW,faceH);
}
