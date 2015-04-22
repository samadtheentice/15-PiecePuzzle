var Puzzle = function (exports) {
    var seeds = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,0];
    var row = 4;
    var col = 4;
    var colors = [];
    var boardVar = 1;
    exports.matrix = function(numrows, numcols) {
        var arr = new Array(numrows);
        for (var i = 0; i < numrows; ++i) {
            arr[i] = new Array(numcols);
        }
        return arr;
    }
    exports.controller = function() {
        return {
            baseToBase: function(fromBase, toBase, value) {
                if (value === "")
                    value = 0;
                value = parseInt(value, fromBase);
                return Number(value).toString(toBase).toUpperCase();
            },
            shuffle: function(array) {
				//getCoordinatesBoundedByEmptyCoordinates
				var directionToMove;

				var emptyXCoord=emptyCoord[0];
				var emptyYCoord=emptyCoord[1];

				var positions=[];


				if((emptyXCoord-1)>=0){
					positions.push(1);
				}
				if((emptyXCoord+1)<=3){
					positions.push(2);
				}
				if((emptyYCoord-1)>=0){
					positions.push(3);
				}
				if((emptyYCoord+1)<=3){
					positions.push(4);
				}

				var selectedPosition=positions[Math.floor(Math.random()*positions.length)];

				if(selectedPosition==1){
					emptyXCoord=emptyXCoord-1;
				}
				

				if(selectedPosition==2){
					emptyXCoord=emptyXCoord+1;
				}
				

				if(selectedPosition==3){
					emptyYCoord=emptyYCoord-1;
				}
				

				if(selectedPosition==4){
					emptyYCoord=emptyYCoord+1;
				}
				
				var divCoordArray = [];
				divCoordArray[0]=emptyXCoord;
				divCoordArray[1]=emptyYCoord;

				updateDataMatrixWithSpecificCoord(divCoordArray,false,"");
            },
            updateDataMatrixWithValues: function() {
                var suffledNumbers = seeds;
                for (var i = 0; i < puzzleModelObject.dataMatrix.length; ++i) {
                    for (var j = 0; j < puzzleModelObject.dataMatrix[i].length; ++j) {
                        puzzleModelObject.dataMatrix[i][j] = suffledNumbers[i * 4 + j];

                        //capture the empty coordinates
                        if (suffledNumbers[i * 4 + j] === 0) {
                            emptyCoord[0] = i;
                            emptyCoord[1] = j;
                        }

                    }

                }
            },
            mapViewMatrixWithDiv: function() {
                for (var i = 0; i < puzzleModelObject.viewMatrix.length; ++i) {
                    for (var j = 0; j < puzzleModelObject.viewMatrix[i].length; ++j) {
                        puzzleModelObject.viewMatrix[i][j] = document.getElementById('b' + (i * 4 + j));
                    }
                }
            },
            updateViewWithDataMatrix: function() {
                var colors = [];
                var i = 0;
                for (var i = 0; i < puzzleModelObject.viewMatrix.length; ++i) {
                    for (var j = 0; j < puzzleModelObject.viewMatrix[i].length; ++j) {
                        if (!(puzzleModelObject.dataMatrix[i][j] === 0)) {
                            puzzleModelObject.viewMatrix[i][j].innerHTML = puzzleModelObject.dataMatrix[i][j];
                        }

                        var c1, c2, c3;
                        /*while (true) {
                            c1 = Math.floor((Math.random() * 255) + 0);
                            c2 = Math.floor((Math.random() * 255) + 0);
                            c3 = Math.floor((Math.random() * 255) + 0);
                            if (colors.indexOf(c1 + c2 + c3) <= -1) {
                                colors[i] = c1 + c2 + c3;
                                break;
                            }
                        }*/
                        puzzleModelObject.viewMatrix[i][j].style.backgroundColor = 'rgb(208,208,208)' //'rgb(' + c1 + ',' + c2 + ',' + c3 + ')';
                    }
                }
                puzzleModelObject.viewMatrix[emptyCoord[0]][emptyCoord[1]].style.backgroundColor='gray';
            }

        }
    };
    return exports;
}({});


PuzzleModel = function(row, column) {
    return {
        dataMatrix: Puzzle.matrix(row, column),
        viewMatrix: Puzzle.matrix(row, column)
    }
};

var puzzleModelObject = PuzzleModel(4, 4);

var captureUserMoves=[];


var emptyCoord = new Array(2);

function updateDataMatrixWithSpecificCoord(divCoordArray,capture,displaymoves) {

    var tempEmptyCoordX_ = emptyCoord[0];
    var tempEmptyCoordY_ = emptyCoord[1];

    var tempEmptyCoordX = emptyCoord[0];
    var tempEmptyCoordY = emptyCoord[1];
    //swap current div value and empty coord
    var tempDivCoordX = divCoordArray[0];
    var tempDivCoordY = divCoordArray[1];

    //alert("chk1 ..."+dataMatrix[divCoordArray[0]][divCoordArray[1]]);

    puzzleModelObject.dataMatrix[emptyCoord[0]][emptyCoord[1]] = puzzleModelObject.dataMatrix[divCoordArray[0]][divCoordArray[1]];

    //alert("chk2 ..."+dataMatrix[divCoordArray[0]][divCoordArray[1]]);

    puzzleModelObject.dataMatrix[divCoordArray[0]][divCoordArray[1]] = 0;

    //alert("chk3 ..."+dataMatrix[divCoordArray[0]][divCoordArray[1]]);

    emptyCoord[0] = tempDivCoordX;
    emptyCoord[1] = tempDivCoordY;

    //updateViewWithDataMatrix();

    updateViewOnMoves(divCoordArray, tempEmptyCoordX, tempEmptyCoordY);

    if(displaymoves){
        document.getElementById('trackmovediv').innerHTML=document.getElementById('trackmovediv').innerHTML + " "+displaymoves+" "+
        puzzleModelObject.dataMatrix[tempEmptyCoordX_][tempEmptyCoordY_]+" -> ["+tempEmptyCoordX+"X"+tempEmptyCoordY+"]" + "<br/>";
    }
    if(capture){
        captureUserMoves.push([tempEmptyCoordX,tempEmptyCoordY]);
    }

}

var moves=0;
var totalMoves=50;

document.addEventListener("DOMContentLoaded", function(event) {
    var controller = Puzzle.controller();
    controller.updateDataMatrixWithValues();
    controller.mapViewMatrixWithDiv();
    controller.updateViewWithDataMatrix();

   var myInterval = setInterval(function(){ if (moves==(totalMoves-1)){
        clearInterval(myInterval);}
   controller.shuffle(moves++);}, 1);

   var timerDiv=document.getElementById('showtimer');

   t = setTimeout(add, 1*totalMoves,timerDiv);

   document.getElementById('newgame').addEventListener("click", newGame);
   document.getElementById('undo').addEventListener("click", undoMove);

});
 
function getDivCoordinate(id) {
    var blockNumber = id.replace('b', '');
    var divCoordArray = new Array(2);
    var quotient = Math.floor(blockNumber / 4);
    var remainder = blockNumber % 4;
    divCoordArray[0] = quotient;
    divCoordArray[1] = remainder;

    if (isMoveAllowed(divCoordArray)) {
        //update the datamatrix
        updateDataMatrixWithSpecificCoord(divCoordArray,true,"move");
        if (checkWin()) {
            document.getElementById('gameMessage').innerHTML = "Game Over";
            stop(document.getElementById('showtimer'));
        }

        //update the emptyCoord array

        //swap the numbers
    }
}

function checkWin() {

    for (var i = 0; i < puzzleModelObject.dataMatrix.length; ++i) {
        var groupBlockNumbers = "";
        for (var j = 0; j < puzzleModelObject.dataMatrix[i].length; ++j) {
            groupBlockNumbers = groupBlockNumbers.concat(puzzleModelObject.dataMatrix[i][j]);
        }
        if (i === 0) {
            if (groupBlockNumbers != "1234") {
                break;
            }
        }

        if (i == 1) {
            if (groupBlockNumbers != "5678") {
                break;
            }
        }
        if (i == 2) {
            if (groupBlockNumbers != "9101112") {
                break;
            }
        }
        if (i == 3) {
            if (groupBlockNumbers != "1314150") {
                break;
            } else {
                return true;
            }
        }
    }
    return false;
}

function isMoveAllowed(divCoordArray) {
    var emptyXCoord = emptyCoord[0];
    var emptyYCoord = emptyCoord[1];

    if ((divCoordArray[0] == emptyXCoord + 1) && (divCoordArray[1] == emptyYCoord)) {
        return true;
    } else if ((divCoordArray[0] == emptyXCoord - 1) && (divCoordArray[1] == emptyYCoord)) {
        return true;
    } else if ((divCoordArray[0] == emptyXCoord) && (divCoordArray[1] == emptyYCoord + 1)) {
        return true;
    } else if ((divCoordArray[0] == emptyXCoord) && (divCoordArray[1] == emptyYCoord - 1)) {
        return true;
    } else {
        return false;
    }
}



function updateViewOnMoves(divCoordArray, tempEmptyCoordX, tempEmptyCoordY) {
    //puzzleModelObject.viewMatrix[divCoordArray[0]][divCoordArray[1]].innerHTML=puzzleModelObject.dataMatrix[divCoordArray[0]][divCoordArray[1]];
    puzzleModelObject.viewMatrix[divCoordArray[0]][divCoordArray[1]].innerHTML = "";
    var tmpbackcolor = puzzleModelObject.viewMatrix[divCoordArray[0]][divCoordArray[1]].style.backgroundColor;
    puzzleModelObject.viewMatrix[divCoordArray[0]][divCoordArray[1]].style.backgroundColor = puzzleModelObject.viewMatrix[tempEmptyCoordX][tempEmptyCoordY].style.backgroundColor;
    puzzleModelObject.viewMatrix[tempEmptyCoordX][tempEmptyCoordY].innerHTML = puzzleModelObject.dataMatrix[tempEmptyCoordX][tempEmptyCoordY];
    puzzleModelObject.viewMatrix[tempEmptyCoordX][tempEmptyCoordY].style.backgroundColor = tmpbackcolor;
}

var h1,t;
var seconds = 0, minutes = 0, hours = 0,t;


function add(timerDiv) {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerDiv.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	t = setTimeout(add, 1000,timerDiv);
}
/* Start button */ 
//start.onclick = timer;

/* Stop timer */
function stop(timerDiv) {
    clearTimeout(t);
    timerDiv.innerHTML = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}


function newGame() {
	var controller = Puzzle.controller();
    var moveInput = prompt("Please enter shuffel move counts",'15');
    if (moveInput === null) {
        return; //break out of the function early
    }    
    if(isNaN(moveInput)){
        alert("Please enter number");
        return;    
    }
    
    if(moveInput!=0 && !isNaN(moveInput)){
        totalMoves=moveInput;
    }
	moves=0;
	
	document.getElementById('gameMessage').innerHTML="";
    document.getElementById('trackmovediv').innerHTML="";
    controller.updateDataMatrixWithValues();
    controller.mapViewMatrixWithDiv();
    controller.updateViewWithDataMatrix();
    
   var myInterval = setInterval(function(){ if (moves==(totalMoves-1)){
        clearInterval(myInterval);}
   controller.shuffle(moves++);}, 1);

   var timerDiv=document.getElementById('showtimer');
    clearTimeout(t);
    seconds = 0, minutes = 0, hours = 0;
       t = setTimeout(add, 1*totalMoves,timerDiv);
}


function undoMove(){
    var divCoordArray = captureUserMoves.pop();
    if(divCoordArray){
        updateDataMatrixWithSpecificCoord(divCoordArray,false,"undo");
    }
}