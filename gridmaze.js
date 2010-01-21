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


var HorizontalWall = Create2DArray(3, 4, false);
var VerticalWall = Create2DArray(3, 4, false);
var coordX = 0;
var coordY = 0;


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

	
function IsSurroundedByWalls(x, y) {
	var topAndBottom = Walls[0][x][y] && Walls[0][x][y+1];
	var sides = Walls[1][y][x] && Walls[1][y][x+1];
	return sides && topAndBottom;
}


function CalculateEnclosure() {
	var result = Create2DArray(3, 3, false);
	
	//var active = Create2DArray(3, 3, cellStatusType.unknown);
	
	for (var x=0; x<result.length; x++) {
		for (var y=0; y<result[0].length; y++) {
			result[x][y] = IsSurroundedByWalls(x, y);
		}	
	}
	
	return result;
}




function draw() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
 
	ctx.fillStyle = "rgb(10,200,20)";
	
	var FilledIn = CalculateEnclosure();
	
	for (var x=0; x<FilledIn.length; x++) {
		for (var y=0; y<FilledIn.length; y++) {
			if (FilledIn[x][y])
				ctx.fillStyle = "rgb(75,100,230)";
			else
				ctx.fillStyle = "rgb(235, 235, 235)";
			ctx.fillRect(x*100+2, y*100+2, 98, 98);
		}
	}

	var strokeColor = "rgb(200,200,200)";
	
	for (var x=0;x<Walls[0].length;x++) {
		for (var y=0;y<Walls[0][0].length;y++) {
			if (Walls[0][x][y])
				strokeColor = "rgb(0,0,0)";
			else
				strokeColor = "rgb(200,200,200)";
			DrawWall([0, x, y], strokeColor);
		}
	}
	
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

function InsertCat() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.save();
	
	//clear background to white
	//ctx.fillStyle = "rgb(255,255,255)";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	var img = new Image();
	img.src = "crazycat.png";
	ctx.translate(150,150);
	
	AnimatedRotateLeft(ctx, img, 90);

	
	//RotateWallsArrayLeft();
	ctx.restore();
	//draw();
	
}

function RotateLeft() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.save();
	
	//clear background to white
	//ctx.fillStyle = "rgb(255,255,255)";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	var img = new Image();
	img.src = canvas.toDataURL("image/png");
	ctx.translate(150,150);
	
	AnimatedRotateLeft(ctx, img, 90);

	
	//RotateWallsArrayLeft();
	ctx.restore();
	//draw();
	
}

function AnimatedRotateLeft(ctx, img, angle) {
	ctx.drawImage(img,-150,-150);
	ctx.rotate(20 * Math.PI/180);
	ctx.drawImage(img,-150,-150);
	ctx.rotate(40 * Math.PI/180);
	ctx.drawImage(img,-150,-150);
	ctx.rotate(60 * Math.PI/180);
	/*
	for (var a = 10; a<angle; a+=10) {
		ctx.rotate(a * Math.PI/180);
		ctx.drawImage(img,-150,-150);
	}
	*/
		
}

function RotateRight() {
	RotateWallsArrayRight();
}

function RotateWallsArrayLeft() {
	print('output', 'Rotating Left!');
	
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
	print('output', 'Rotating Right!');
	
	var oWalls = Walls;
	var newWalls = [oWalls[1], oWalls[0]];
	
	newWalls[0].reverse();
	for (var x=0;x<newWalls[1].length;x++) {
		newWalls[1][x].reverse();
	}
	
	Walls = newWalls;
	draw();
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
















