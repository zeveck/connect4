
window.addEventListener("load", function(ev) {
    var ROWS = 6;
    var COLUMNS = 7;

    buildBoard(ROWS, COLUMNS);

    initTurnChecker();
});

// Util
function makeDiv(className) {
    var div = document.createElement("div");
    div.className = className;
    return div;
}

function makeZeroedArray(size) {
    var array = [];
    while(size--) array[size] = 0;
    return array;
}

function getPagePos(element) {
    var x = 0;
    var y = 0;
    while (element != null) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }

    return {x: x,y: y};
}

// Connect 4
var playerTurn = "black";

var columnHeight = [];
var rowBottoms   = [];
var turnChecker;

function initTurnChecker() {
    turnChecker = document.querySelector(".turnChecker");
    turnChecker.faceDown = false;
}

function buildBoard(rows, columns) {
    var board = makeDiv("board");
    document.body.appendChild(board);

    // Initialize column heights.
    columnHeight = makeZeroedArray(columns);

    // Add board cells.
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            var cell = buildCell();
            cell.row = i;
            cell.column = j;
            board.appendChild(cell);
        }

        // Has to be set after the cell is added to the page.
        var pos = getPagePos(cell);
        rowBottoms.unshift(pos.y + cell.offsetHeight);

        // Add line break so that the next board cell starts the next row.
        var br = document.createElement("br");
        board.appendChild(br);
    }
}

function makeChecker(color, x, y) {
    var checker = makeDiv(color + "Checker");
    checker.style.left = x + "px";
    checker.style.top = y + "px";
    return checker;
}

function placeChecker(color, x, y, column) {
    var checker = makeChecker(color, x, y);
    document.body.appendChild(checker);

    // Has to be set after the checker is added to the page.
    checker.height = checker.offsetHeight;

    var columnFloor = rowBottoms[columnHeight[column]];
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
    } else {
        console.log(floor);
    }
}

function buildCell() {
    var cell = makeDiv("boardCell");
    cell.onclick = function(ev) {
        if (columnHeight[cell.column] < 6) {
            placeChecker(playerTurn, cell.offsetLeft + 20, 0, cell.column); 
        }
    };
    
    return cell;
}

var flipsToFinish = 0;
function finishTurn() {
    document.querySelector(".prompt").className += " hidden";

    if (playerTurn === "red") {
        playerTurn = "black";
    }
    else {
        playerTurn = "red";
    }

    flipsToFinish++;
    var intervalHandle = setInterval(function() {
        if (flipElement(turnChecker, flipsToFinish)) {
            window.clearInterval(intervalHandle);
            flipsToFinish--;
        }
    }, 100);
}