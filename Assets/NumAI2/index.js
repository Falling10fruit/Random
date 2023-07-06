var Canvas = document.getElementById("Canvas");
var CTX = Canvas.getContext("2d");
var UndoButton = document.getElementById("UndoButton");
var ClearButton = document.getElementById("ClearButton");

Canvas.width = Canvas.height = window.innerWidth/5*2;

var MouseX;
var MouseY;
var Answers = [/*
    [
        []
    ]
*/];
var Grid = [[]];
var UndoHistory = [];
var GridLength = 100
var CellLength = Canvas.width/GridLength;
var IsMouseDown = false;

window.addEventListener("mousemove", function (e) {
    MouseX = e.clientX - Canvas.getBoundingClientRect().x - document.body.scrollLeft - 5;
    MouseY = e.clientY - Canvas.getBoundingClientRect().y - document.body.scrollTop - 5;

    if (IsMouseDown) {
        Grid[Math.floor(MouseY/CellLength)][Math.floor(MouseX/CellLength)] = 1;
    }
});

window.addEventListener("mousedown", function () {
    IsMouseDown = true;

    UndoHistory.push(Grid.slice());

    Grid[Math.floor(MouseY/CellLength)][Math.floor(MouseX/CellLength)] = 1;
});

window.addEventListener("mouseup", function () {IsMouseDown = false;});

UndoButton.addEventListener("click", function () {Undo();});

ClearButton.addEventListener("click", function () {ClearGrid();});

ClearGrid();

Tick();

function Tick () {
    CTX.fillStyle = "rgb(255, 255, 255)";
    CTX.fillRect(0, 0, Canvas.width, Canvas.height);

    CTX.fillStyle = "rgb(0, 0, 0)";
    for (var i = 0; i < GridLength; i++) {
        for (var x = 0; x < GridLength; x++) {
            if (Grid[i][x] == 1) {
                CTX.fillRect(x*CellLength, i*CellLength, CellLength, CellLength)
            }
        }
    }

    requestAnimationFrame(Tick);
}

function ClearGrid () {
    var Row = [];

    for (var i = 0; i < GridLength; i++) {
        Row.push(0);
    }

    for (var i = 0; i < GridLength; i++) {
        Grid.push(Row.slice());
    }
}

function Undo () {
    if (UndoHistory.length > 0) {
        Grid = UndoHistory[UndoHistory.length - 1].slice();
        UndoHistory.splice(UndoHistory.length - 1);
    }
}