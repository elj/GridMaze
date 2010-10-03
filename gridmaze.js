

function Create2DArray(columns, rows, value) {
  var arr = [];

  for (var c=0;c<columns;c++) {
     arr[c] = [];
     for (var r=0;r<rows;r++) {
     	arr[c][r] = value;
     }
  }

  return arr;
}


// initialize wall arrays
var HorizontalWall = Create2DArray(3, 4, false);
var VerticalWall = Create2DArray(3, 4, false);
var coordX = 0;
var coordY = 0;

// setup initial wall positions
HorizontalWall[0][0] = true;
HorizontalWall[0][1] = true;
HorizontalWall[0][2] = true;
HorizontalWall[0][3] = true;

HorizontalWall[1][2] = true;
HorizontalWall[1][3] = true;

HorizontalWall[2][0] = true;
HorizontalWall[2][1] = true;
HorizontalWall[2][2] = true;
HorizontalWall[2][3] = true;

VerticalWall[0][0] = true;
VerticalWall[0][1] = true;
VerticalWall[0][2] = true;
VerticalWall[0][3] = true;

VerticalWall[1][2] = true;
VerticalWall[1][3] = true;

VerticalWall[2][0] = true;
VerticalWall[2][1] = true;
VerticalWall[2][2] = true;
VerticalWall[2][3] = true;

var Walls = [];
Walls[0] = HorizontalWall;
Walls[1] = VerticalWall;



/**********************************\
** Draw Current Walls and Squares **
\**********************************/


function draw() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	// set fillStyle to white and fill canvas background
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
 
	// no idea why this is here...??
	ctx.fillStyle = "rgb(10,200,20)";
	
	// generate 3x3 array describing whether tiles are enclosed (t) or not (f)
	var FilledIn = CalculateSquaresArray();
	
	// use FilledIn to draw each tile with correct color
	for (var x=0; x<FilledIn.length; x++) {
		for (var y=0; y<FilledIn.length; y++) {
			if (FilledIn[x][y])
				ctx.fillStyle = "rgb(75,100,230)";
			else
				ctx.fillStyle = "rgb(235, 235, 235)";
			ctx.fillRect(x*100+2, y*100+2, 98, 98);
		}
	}

	// set default wall color (med grey)
	var strokeColor = "rgb(200,200,200)";
	
	// use Walls (HorizontalWall) to draw horizontal wall positions
	for (var x=0;x<Walls[0].length;x++) {
		for (var y=0;y<Walls[0][0].length;y++) {
			if (Walls[0][x][y])
				strokeColor = "rgb(0,0,0)";
			else
				strokeColor = "rgb(200,200,200)";
			DrawWall([0, x, y], strokeColor);
		}
	}
	
	// use Walls (VerticalWall) to draw vertical wall positions
	for (var x=0;x<Walls[1].length;x++) {
		for (var y=0;y<Walls[1][0].length;y++) {
			if (Walls[1][x][y])
				strokeColor = "rgb(0,0,0)";
			else
				strokeColor = "rgb(200,200,200)";
			DrawWall([1, x, y], strokeColor);
		}
	}
	
	canvas.addEventListener("click", ClickToToggleWall, false);
	canvas.addEventListener("mousemove", updateHoverCoordinates, false);
	//canvas.addEventListener("mousemove", HighlightNearestWall, false);
	
	print('horizontalwall', '0:[' + Walls[0][0] + ']1:[' + Walls[0][1] + ']2:[' + Walls[0][2] + ']');
	print('verticalwall', '0:[' + Walls[1][0] + ']1:[' + Walls[1][1] + ']2:[' + Walls[1][2] + ']');

}

function DrawWall(wall, color) {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	if (wall == [])
		return;
		
	ctx.strokeStyle = color;
	if (wall[0] == 0) {
		ctx.strokeRect(wall[1]*100, wall[2]*100, 100, 2);
	}
	if (wall[0] == 1) {
		ctx.strokeRect(wall[2]*100, wall[1]*100, 2, 100);
	}
}


function CalculateSquaresArray() {
// generate 3x3 array describing whether tiles are enclosed (t) or not (f)

	var result = Create2DArray(3, 3, false);
	
	for (var x=0; x<result.length; x++) {
		for (var y=0; y<result[0].length; y++) {
			result[x][y] = IsSurroundedByWalls(x, y);
		}	
	}	
	return result;
}


function IsSurroundedByWalls(x, y) {
// determine whether a square is surrounded on all four sides by walls

	var topAndBottom = Walls[0][x][y] && Walls[0][x][y+1];
	var sides = Walls[1][y][x] && Walls[1][y][x+1];
	return sides && topAndBottom;
}


function RotateWallsArrayLeft() {
// rotate the entire array of walls counter-clockwise, and draw to canvas

	print('output', 'Rotating Walls Array counter-clockwise!');
	
	var oWalls = Walls;
	var newWalls = [oWalls[1], oWalls[0]];
	
	newWalls[1].reverse();
	for (var x=0;x<newWalls[0].length;x++) {
		newWalls[0][x].reverse();
	}
	
	Walls = newWalls;
	draw();
}

function RotateWallsArrayRight() {
// rotate the entire array of walls clockwise, and draw to canvas

	print('output', 'Rotating Walls Array clockwise!');
	
	var oWalls = Walls;
	var newWalls = [oWalls[1], oWalls[0]];
	
	newWalls[0].reverse();
	for (var x=0;x<newWalls[1].length;x++) {
		newWalls[1][x].reverse();
	}
	
	Walls = newWalls;
	draw();
}


/*******************\
** Image Animation **
\*******************/


function InsertCat() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "crazycat.png";
	
	ctx.drawImage(img,0,0);
	
}


function RotateLeft() {
// called by "Rotate Left" button

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.save();
	
	var img = new Image();
	img.src = canvas.toDataURL("image/png");
	
	AnimatedRotateLeft(ctx, img);
	
}

function AnimatedRotateLeft(ctx, img) {
	
	print('output', 'Animating counter-clockwise rotation!');

	// animated rotation for 75 degrees
	singleRotate(ctx, img, -15);
	setTimeout(function(){singleRotate(ctx,img,-15);}, 100);
	setTimeout(function(){singleRotate(ctx,img,-15);}, 200);
	setTimeout(function(){singleRotate(ctx,img,-15);}, 300);
	setTimeout(function(){singleRotate(ctx,img,-15);}, 400);

	// re-drawing walls as the final "move"
	setTimeout(function(){RestoreCanvasContext(ctx);},450);
	setTimeout("RotateWallsArrayLeft()",500);

}

function singleRotate(ctx, img, angle) {

	//clear background to white first
	ctx.fillStyle = "rgb(255,255,255)";
	
	// additional pixel buffer to eliminate artifact lines
	ctx.fillRect(-1, -1, canvas.width+2, canvas.height+2);
	
	ctx.translate(150,150);
	ctx.rotate(angle * Math.PI/180);
	ctx.translate(-150,-150);
	ctx.drawImage(img,0,0);

}

function RestoreCanvasContext(ctx) {
// necessary for restoring saved canvas context states within a setTimeout() call
	ctx.restore();
}

function RotateRight() {
// called by "Rotate Right" button

	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.save();
	
	var img = new Image();
	img.src = canvas.toDataURL("image/png");
	
	AnimatedRotateRight(ctx, img);

}

function AnimatedRotateRight(ctx, img) {

	print('output', 'Animating clockwise rotation!');

	// animated rotation for 75 degrees
	singleRotate(ctx, img, 15);
	setTimeout(function(){singleRotate(ctx,img,15);}, 100);
	setTimeout(function(){singleRotate(ctx,img,15);}, 200);
	setTimeout(function(){singleRotate(ctx,img,15);}, 300);
	setTimeout(function(){singleRotate(ctx,img,15);}, 400);

	// re-drawing walls as the final "move"
	setTimeout(function(){RestoreCanvasContext(ctx);},450);
	setTimeout("RotateWallsArrayRight()",500);

}






function HighlightNearestWall(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;
	
	var wall = GetWallFromCoordinates(x, y);
	
	draw();
	
	if (wall != null) {
		DrawWall(wall, "rgb(255,255,0)");
	}
	
	print('output', x + ', ' + y);

}


function ClickToToggleWall(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;
	
	print('clickX', x);
	print('clickY', y);
	
	var w = GetWallFromCoordinates(x, y);
	
	if (w != [])
		Walls[w[0]][w[1]][w[2]] = !Walls[w[0]][w[1]][w[2]];
	
	draw();
	print('output', x + ', ' + y);
}


function GetWallFromCoordinates(x, y) {
	var quadX;
	var quadY;
	
	if ((x > 325) || (y > 325)) {
		return null;
	} else if ((x % 100 > 25) && (x % 100 < 75)) {		//test for proximity to horizontal wall
		if ((y % 100 < 25) || (y % 100 > 75)) {
			quadX = Math.round((x-26)/100);
			quadY = Math.round(y/100);
			return [0, quadX, quadY];
		}
	} else if ((x % 100 < 25) || (x % 100 > 75)) {		//test for proximity to vertical wall
		if ((y % 100 > 25) && (y % 100 < 75)) {
			quadX = Math.round(x/100);
			quadY = Math.round((y-26)/100);
			return [1, quadY, quadX];
		}
	}
	return null;
	
}


function updateHoverCoordinates(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;

	print('hoverY', y);
	print('hoverX', x);
}

function print(id, text) {
	
	document.getElementById(id).innerHTML = text;
}
















