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


HorizontalWall[1][3] = true;
HorizontalWall[2][2] = true;
HorizontalWall[2][3] = true;
HorizontalWall[0][0] = true;
HorizontalWall[0][1] = true;
HorizontalWall[1][2] = true;
HorizontalWall[2][1] = true;
HorizontalWall[2][0] = true;

VerticalWall[0][0] = true;
VerticalWall[0][1] = true;
VerticalWall[1][0] = true;
VerticalWall[2][3] = true;



var Walls = [];
Walls[0] = HorizontalWall;
Walls[1] = VerticalWall;

	
function IsSurroundedByWalls(x, y) {
	var topAndBottom = Walls[0][x][y] && Walls[0][x][y+1];
	var sides = Walls[1][y][x] && Walls[1][y+1][x];
	return sides && topAndBottom;
}


function CalculateEnclosure() {
	var result = Create2DArray(3, 3, false);
	
	//var active = Create2DArray(3, 3, cellStatusType.unknown);
	/*
	for (var x=0; x<result.length; x++) {
		for (var y=0; y<result[0].length; y++) {
			result[x][y] = IsSurroundedByWalls(x, y);
		}	
	}
	*/
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
	canvas.addEventListener("mousemove", HighlightNearestWall, false);
	
	print('horizontalwall', Walls[0]);
	print('verticalwall', Walls[1]);

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
	
	var debugText = 'not near a wall ';
	
	var wall = [];
	
	if ((x > 325) || (y > 325)) {
		debugText = 'not near a wall ';
	} else if ((x % 100 > 25) && (x % 100 < 75)) {		//test for proximity to horizontal wall
		if ((y % 100 < 25) || (y % 100 > 75)) {
			var quadX = Math.round((x-26)/100);
			var quadY = Math.round(y/100);
			debugText = 'near horizontal wall [' + quadX + '][' + quadY + '] ';
			wall = [0, quadX, quadY];
		}
	} else if ((x % 100 < 25) || (x % 100 > 75)) {		//test for proximity to vertical wall
		if ((y % 100 > 25) && (y % 100 < 75)) {
			var quadX = Math.round(x/100);
			var quadY = Math.round((y-26)/100);
			debugText = 'near vertical wall [' + quadY + '][' + quadX + '] ';
			wall = [1, quadY, quadX];
		}
	}
	
	draw();
	DrawWall(wall, "rgb(255,255,0)");
	
	print('output', debugText + x + ', ' + y);

}


function ClickToToggleWall(e) {
	var x = e.clientX - 8;
	var y = e.clientY - 8;
	
	print('clickX', x);
	print('clickY', y);
	var debugText = 'click not near a wall ';
	
	if ((x > 325) || (y > 325)) {
		debugText = 'click not near a wall ';
	} else if ((x % 100 > 25) && (x % 100 < 75)) {		//test for proximity to horizontal wall
		if ((y % 100 < 25) || (y % 100 > 75)) {
			var quadX = Math.round((x-26)/100);
			var quadY = Math.round(y/100);
			debugText = 'click near horizontal wall [' + quadX + '][' + quadY + '] ';
			Walls[0][quadX][quadY] = !Walls[0][quadX][quadY];
		}
	} else if ((x % 100 < 25) || (x % 100 > 75)) {		//test for proximity to vertical wall
		if ((y % 100 > 25) && (y % 100 < 75)) {
			var quadX = Math.round(x/100);
			var quadY = Math.round((y-26)/100);
			debugText = 'click near vertical wall [' + quadY + '][' + quadX + '] ';
			Walls[1][quadY][quadX] = !Walls[1][quadY][quadX];
		}
	}
	
	draw();
	print('output', debugText + x + ', ' + y);
	
	
	/*
	//test whether click was within the drawn grid
	if (x > (Walls[0].length*100) + 50) {
		print('output', 'x is outside the grid'); //+ (Walls[0].length*100 + 50));
		return;
	}
	if (y > (Walls[0][0].length*100) + 50) {
		print('output', 'y is outside the grid');
		return;
	}
		
	//
	var quadX = Math.round((Math.min(x,298)-49)/100);
	
	var quadY = Math.round(y/100);
	
	if (x > quadX*100+25 && x < quadX*100+75 && y > quadY*100-25 && y < quadY*100+25) {
		Walls[0][quadX][quadY] = !Walls[0][quadX][quadY];
		draw();
	}
	
	if (x > quadX*100-25 && x < quadX*100+25 && y > quadY*100+25 && y < quadY*100+75) {
		Walls[1][quadY][quadX] = !Walls[1][quadY][quadX];
		draw();
	}
	*/
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
















