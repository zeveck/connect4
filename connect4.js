
window.onload = function(ev) {
    buildBoard();
};
var playerTurn = "red";


function createDiv(className) {
    var div = document.createElement("div");
    div.className = className;
    return div;
}

var columnHeight = [0, 0, 0, 0, 0, 0, 0];
var cellBottoms = [];
function buildBoard() {
    var board = createDiv("board");
    document.body.appendChild(board);

    var column = 0;
    for (var i = 1; i <= 42; i++) {
        var cell = buildCell();
        cell.column = column;
        column++;
        board.appendChild(cell);

        // Start a new row if index divides by 7 evenly.
        if (i % 7 === 0) {
            column = 0;
            cellBottoms.unshift(cell.getBoundingClientRect().bottom);
            var br = document.createElement("br");
            board.appendChild(br);
        }
    }
    console.log(cellBottoms);
}

function placeChecker(color, x, y, column) {
    var checker = createDiv(color + "Checker");
    checker.style.left = x + "px";
    checker.style.top = y + "px";
    document.body.appendChild(checker);
    checker.height = checker.getBoundingClientRect().height;

   var columnFloor = cellBottoms[columnHeight[column]];
    dropChecker(checker, columnFloor);
    columnHeight[column]++;
    finishTurn();
}

function dropChecker(checker, floor) {
    var DROP_OFFSET = 4;
    var DROP_DELAY_MS = 10;  // milliseconds

    var newTop = checker.offsetTop + DROP_OFFSET;
    checker.style.top = newTop + "px";

    if (newTop + checker.height + 4 < floor) {
        setTimeout(function() {
            dropChecker(checker, floor);
        }, DROP_DELAY_MS);
    }
}

function buildCell() {
    var cell = createDiv("boardCell");
    cell.onclick = function(ev) {
        if (columnHeight[cell.column] < 6) {
            placeChecker(playerTurn, cell.offsetLeft + 20, 0, cell.column); 
        }
    };
    
    return cell;
}

function finishTurn() {
    document.querySelector(".prompt").className += " hidden";

    if (playerTurn === "red") {
        playerTurn = "black";
    }
    else {
        playerTurn = "red";
    }
}