var img = [];
var framesW = 17;
var framesH = 9;
var numPhotos = 0;
var xPos = 0;
var yPos = 0;
var faceW = 0;
var faceH = 0;
var faceRad = 0;
var cameraW, cameraH;
var hidecamera = ture;

function preload() {
	for (var i = 0; i < framesH; i++) {
		for (var j = 0; j < framesW; j++) {
			var photo = "assets/stones/" + i + "_" + j + ".jpg";
			img[numPhotos] = loadImage(photo);
			numPhotos++;
		}
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(251,251,251);
	var video = document.getElementById('video');
	cameraW = video.width;
	cameraH = video.height;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var tracker = new tracking.ObjectTracker('face');
	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	tracking.track('#video', tracker, {
		camera: true
			//camera:false
	});
	tracker.on('track', function(event) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		event.data.forEach(function(rect) {
			faceW = rect.width;
			faceH = rect.height;
			faceRad = (faceW + faceH) / 2;
			xPos = rect.x + faceW / 2;
			yPos = rect.y + faceH / 2;

			if (hidecamera) {
				context.strokeStyle = '#a64ceb';
				context.strokeRect(rect.x, rect.y, rect.width, rect.height);
				context.font = '11px Helvetica';
				context.fillStyle = "#fff";
				context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
				context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
			}
		});
	});
}

function draw() {
	var xMapped = framesW - ceil(map(xPos, 0, cameraW, 0, width) / width * framesW) - 1;
	var yMapped = framesH - ceil(map(yPos, 0, cameraH, 0, height) / height * framesH) - 1;
	// var xLim = (cameraW / 4);
	// if (xPos > (cameraW - xLim)) {
	// 	xPos = cameraW - xLim;
	// }
	// if (xPos < xLim) {
	// 	xPos = xLim;
	// }
	// var xMapped = framesW - ceil(map(xPos, xLim, cameraW - xLim, 0, width) / width * framesW) - 1;
	// var yMapped = framesH - ceil(map(yPos, 10, cameraH - 10, 0, height) / height * framesH) - 1;

	//var xMapped = floor(mouseX/width*framesW);
	//var yMapped = floor(mouseY/height*framesH);;

	println("x: " + xMapped + " y: " + yMapped + " frame: " + (xMapped + (framesW - 1) * yMapped));

	imageMode(CENTER);
	image(img[xMapped + (framesW - 1) * yMapped], width / 2, height / 2, 400, 295);
	//println(frameRate());
	//noFill();

	// strokeWeight(2);
	// ellipseMode(CENTER);
	//ellipse(xPos, yPos, faceRad);
	//ellipse(xMapped, yMapped, faceRad);
	//fill(random(0, 255), random(0, 255), random(0, 255));
	//rect(xPos, yPos, faceW, faceH);
}


function keyPressed() {
	if (keyCode === ENTER) {
		hidecamera = !hidecamera;
	}
}