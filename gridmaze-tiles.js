
/**************************\
** Initialize Wall Arrays **
\**************************/


var HorizontalWall0 = Create2DArray(3, 4, false);
var VerticalWall1 = Create2DArray(3, 4, false);

// setup static initial wall positions
HorizontalWall0[0][0] = true;
HorizontalWall0[0][1] = true;
HorizontalWall0[0][2] = true;
HorizontalWall0[0][3] = true;

HorizontalWall0[1][2] = true;
HorizontalWall0[1][3] = true;

HorizontalWall0[2][0] = true;
HorizontalWall0[2][1] = true;
HorizontalWall0[2][2] = true;
HorizontalWall0[2][3] = true;

VerticalWall1[0][0] = true;
VerticalWall1[0][1] = true;
VerticalWall1[0][2] = true;
VerticalWall1[0][3] = true;

VerticalWall1[1][2] = true;
VerticalWall1[1][3] = true;

VerticalWall1[2][0] = true;
VerticalWall1[2][1] = true;
VerticalWall1[2][2] = true;
VerticalWall1[2][3] = true;



var Walls = [];
Walls[0] = HorizontalWall0;
Walls[1] = VerticalWall1;

/*
var RandomHorizontalWall = CreateRandomized2DArray(3, 4);
var RandomVerticalWall = CreateRandomized2DArray(3, 4);

InitialWalls[0] = RandomHorizontalWall;
InitialWalls[1] = RandomVerticalWall;
*/

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

function CreateRandomized2DArray(columns, rows) {
  var arr = [];
  for (var c=0;c<columns;c++) {
     arr[c] = [];
     for (var r=0;r<rows;r++) {
     	var value = Math.round(Math.random()+.3);
     	if (value==1)
	     	arr[c][r] = true;
	     else
	     	arr[c][r] = false;
     }
  }
  return arr;
}


/**********************\
** Initializing Tiles **
\**********************/


var Tiles = [];

function Tile(canvas, walls) {
	this.canvas = canvas;
	this.walls = walls;
	this.updateWalls = function(wallsArray) {
		print('newhwall', '0:[' + wallsArray[0][0] + ']1:[' + wallsArray[0][1] + ']2:[' + wallsArray[0][2] + ']');
		print('newvwall', '0:[' + wallsArray[1][0] + ']1:[' + wallsArray[1][1] + ']2:[' + wallsArray[1][2] + ']');
		
		this.walls = wallsArray
		
		print('newTileHwall', '0:[' + this.walls[0][0] + ']1:[' + this.walls[0][1] + ']2:[' + this.walls[0][2] + ']');
		print('newTileVwall', '0:[' + this.walls[1][0] + ']1:[' + this.walls[1][1] + ']2:[' + this.walls[1][2] + ']');
	}
	this.getCanvas = function() {
		return canvas;
	}
	this.getWalls = function() {
		return walls;
	}
	this.getHorizontalWalls = function() {
		return walls[0];
	}
	this.getVerticalWalls = function() {
		return walls[1];
	}
	this.setHorizontalWalls = function(wallsArrayH) {
		this.walls[0] = wallsArrayH;
	}
	this.setVerticalWalls = function(wallsArrayV) {
		this.walls[1] = wallsArrayV;
	}
	
	this.toString = function() {
		return "I exist";
	}
}


function CreateTileArray() {
// get array of all canvases, combine each with a randomized walls array
	var arr = [];
	var canvases = [];
	canvases = document.getElementsByTagName("canvas");
	print('output2', "canvases length is " + canvases.length);
	for (var c=0;c<canvases.length-1;c++) {
	
  		var walls = Walls; //var walls = [];
  		//walls[0] = CreateRandomized2DArray(3, 4);
  		//walls[1] = CreateRandomized2DArray(3, 4);
		arr[c] = new Tile(canvases[c],walls);
	}
	
	return arr;
}



/*************************\
** Initializing Canvases **
\*************************/


var activeTileID = 0;


var gridIsEditable = 0;

function setEditTilesEnvironment() {
// called onload - needs to eventually set parameters to make walls editable
	
	gridIsEditable = 1;
	Tiles = CreateTileArray();
	
	activeTileID = 0;
	
	draw();
	
	var canvas2 = document.getElementById("canvas10");
	drawAnotherCanvas(canvas2);
}

function setMultigridEnvironment() {
// called onload - needs to eventually set parameters to make walls uneditable
	
	Tiles = CreateTileArray();
	
	activeTileID = 0;
	
	draw();
	
	var canvas2 = document.getElementById("canvas10");
	drawAnotherCanvas(canvas2);
}




/**********************************\
** Draw Current Walls and Squares **
\**********************************/

function drawAnotherCanvas(canvas) {
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "rgb(255,255,0)";
	ctx.fillRect(50,50,200,200);
	
}

function draw() {
	
	//print('output', "Tiles is " + Tiles);
	//print('output2', "grid is "+gridIsEditable);
	var canvas;
	
	if(Tiles[activeTileID].getCanvas()) {
		print('output', "Active Tile = " + activeTileID);
		canvas = Tiles[activeTileID].getCanvas();
	} else {
		print('output', "No canvas!");
		canvas = document.getElementById("canvas00");

	}
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
	
	var Walls = Tiles[activeTileID].getWalls();
	
	// use Walls (HorizontalWall) to draw horizontal wall positions
	for (var x=0;x<Walls[0].length;x++) {
		for (var y=0;y<Walls[0][0].length;y++) {
			if (Walls[0][x][y])
				strokeColor = "rgb(0,0,0)";
			else
				strokeColor = "rgb(200,200,200)";
			DrawWall(ctx, [0, x, y], strokeColor);
		}
	}
	
	// use Walls (VerticalWall) to draw vertical wall positions
	for (var x=0;x<Walls[1].length;x++) {
		for (var y=0;y<Walls[1][0].length;y++) {
			if (Walls[1][x][y])
				strokeColor = "rgb(0,0,0)";
			else
				strokeColor = "rgb(200,200,200)";
			DrawWall(ctx, [1, x, y], strokeColor);
		}
	}
	
	if (gridIsEditable==1)
		canvas.addEventListener("click", ClickToToggleWall, false);
	
	canvas.addEventListener("mousemove", updateHoverCoordinates_debug, false);
	
	print('horizontalwall', '0:[' + Walls[0][0] + ']1:[' + Walls[0][1] + ']2:[' + Walls[0][2] + ']');
	print('verticalwall', '0:[' + Walls[1][0] + ']1:[' + Walls[1][1] + ']2:[' + Walls[1][2] + ']');

}

function DrawWall(ctx, wall, color) {
	//var canvas = document.getElementById("canvas");
	//var ctx = canvas.getContext("2d");
	
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
	var hWalls = Tiles[activeTileID].getHorizontalWalls();
	var vWalls = Tiles[activeTileID].getVerticalWalls();
	
	var topAndBottom = hWalls[x][y] && hWalls[x][y+1];
	var sides = vWalls[y][x] && vWalls[y][x+1];
	return sides && topAndBottom;
}


function RotateWallsArrayLeft() {
// rotate the entire array of walls counter-clockwise, and draw to canvas
// Walls[0] = Horizontal, [1] = Vertical

	print('output', 'Rotating Walls Array counter-clockwise!');
	
	var oWalls = Tiles[activeTileID].getWalls();
	var newWalls = [oWalls[1], oWalls[0]];
	
	print('oldhwall', '0:[' + oWalls[0][0] + ']1:[' + oWalls[0][1] + ']2:[' + oWalls[0][2] + ']');
	print('oldvwall', '0:[' + oWalls[1][0] + ']1:[' + oWalls[1][1] + ']2:[' + oWalls[1][2] + ']');
	
	newWalls[1].reverse();
	
	for (var x=0;x<newWalls[0].length;x++) {
		newWalls[0][x].reverse();
	}

	Tiles[activeTileID].setHorizontalWalls(newWalls[0]);
	Tiles[activeTileID].setVerticalWalls(newWalls[1]);
	
	draw();
}

function RotateWallsArrayRight() {
// rotate the entire array of walls clockwise, and draw to canvas
// Walls[0] = Horizontal, [1] = Vertical

	print('output', 'Rotating Walls Array clockwise!');
	
	var oWalls = [];
	oWalls = Tiles[activeTileID].getWalls();
	var newWalls = [];
	newWalls = [oWalls[1], oWalls[0]];
	
	print('oldhwall', '0:[' + oWalls[0][0] + ']1:[' + oWalls[0][1] + ']2:[' + oWalls[0][2] + ']');
	print('oldvwall', '0:[' + oWalls[1][0] + ']1:[' + oWalls[1][1] + ']2:[' + oWalls[1][2] + ']');
	
	newWalls[0].reverse();
	
	for (var x=0;x<newWalls[1].length;x++) {
		newWalls[1][x].reverse();
	}
	
	Tiles[activeTileID].setHorizontalWalls(newWalls[0]);
	Tiles[activeTileID].setVerticalWalls(newWalls[1]);
	
	draw();
}


/*******************\
** Image Animation **
\*******************/


function RotateLeft() {
// called by "Rotate Left" button

	var ctx = Tiles[activeTileID].getCanvas().getContext("2d");
	ctx.save();
	
	var img = new Image();
	img.src = Tiles[activeTileID].getCanvas().toDataURL("image/png");
	
	AnimatedRotateLeft(ctx, img);
	
	setTimeout(function(){RotateWallsArrayLeft();},500);
}

function RotateRight() {
// called by "Rotate Right" button

	var ctx = Tiles[activeTileID].getCanvas().getContext("2d");
	ctx.save();
	
	var img = new Image();
	img.src = Tiles[activeTileID].getCanvas().toDataURL("image/png");
	
	AnimatedRotateRight(ctx, img);

	setTimeout(function(){RotateWallsArrayRight();},500);
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

}

function singleRotate(ctx, img, angle) {

	//clear background to white first
	ctx.fillStyle = "rgb(255,255,255)";
	
	// additional pixel buffer to eliminate artifact lines
	ctx.fillRect(-1, -1, Tiles[activeTileID].getCanvas().width+2, Tiles[activeTileID].getCanvas().height+2);
	
	ctx.translate(150,150);
	ctx.rotate(angle * Math.PI/180);
	ctx.translate(-150,-150);
	ctx.drawImage(img,0,0);

}

function RestoreCanvasContext(ctx) {
// necessary for restoring saved canvas context states within a setTimeout() call
	ctx.restore();
}





/******************\
** Event Handlers **
\******************/

function ClickToToggleWall(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;
	var Walls = Tiles[activeTileID].getWalls();
	var newWalls = Walls;
	var w = null;
	
	print('clickX', x);
	print('clickY', y);
	
	w = GetWallFromCoordinates(x, y);
	
	if (w != null) {
		newWalls[w[0]][w[1]][w[2]] = !Walls[w[0]][w[1]][w[2]];
	}
	
	Tiles[activeTileID].updateWalls(newWalls);
	draw();
	print('output', x + ', ' + y);
}

function updateHoverCoordinates_debug(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;

	print('hoverY', y);
	print('hoverX', x);
}


function GetWallFromCoordinates(x, y) {
	var quadX;
	var quadY;
	
	if ((x > 325) || (y > 325)) {
		return null;
	} else if ((x % 100 > 25) && (x % 100 < 75)) {		
		
		//test for proximity to horizontal wall
		if ((y % 100 < 25) || (y % 100 > 75)) {
			quadX = Math.round((x-26)/100);
			quadY = Math.round(y/100);
			return [0, quadX, quadY];
		}
	} else if ((x % 100 < 25) || (x % 100 > 75)) {		
	
		//test for proximity to vertical wall
		if ((y % 100 > 25) && (y % 100 < 75)) {
			quadX = Math.round(x/100);
			quadY = Math.round((y-26)/100);
			return [1, quadY, quadX];
		}
	}
	return null;
	
}




function print(id, text) {
	
	document.getElementById(id).innerHTML = text;
}

// http://stackoverflow.com/questions/2544260/how-to-save-html5-canvas
function saveCanvas() {
	var canvas = Tiles[activeTileID].getCanvas();
	var context = canvas.getContext("2d");
	var strDataURI = canvas.toDataURL("image/png;base64");
	window.open(strDataURI);
}  



function InsertCat() {
	var canvas = Tiles[activeTileID].getCanvas();
	var ctx = canvas.getContext("2d");

	var img = new Image();
	img.src = "crazycat.png";
	
	ctx.drawImage(img,0,0);
	
}













