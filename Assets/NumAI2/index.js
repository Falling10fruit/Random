var Canvas = document.getElementById("Canvas");
var CTX = Canvas.getContext("2d");
var UndoButton = document.getElementById("UndoButton");
var ClearButton = document.getElementById("ClearButton");

Canvas.width = Canvas.height = window.innerWidth/5*2;

var MouseX, MouseY, PastMouseX, PastMouseY;
var Grid = [[]];
var UndoHistory = [];
var Brains = [];
var Answers = [];
var GridLength = 50;
var CellLength = Canvas.width/GridLength;
var PaintSize = 10;
var IsMouseDown = false;

Canvas.addEventListener("mousemove", function (e) {
    PastMouseX = MouseX;
    PastMouseY = MouseY;
    MouseX = e.clientX - Canvas.getBoundingClientRect().x - document.body.scrollLeft - 5;
    MouseY = e.clientY - Canvas.getBoundingClientRect().y - document.body.scrollTop - 5;

    if (IsMouseDown) {
        PaintCells(MouseX, MouseY);
    }
});

Canvas.addEventListener("mousedown", function () {
    IsMouseDown = true;

    UndoHistory.push(Grid.slice());

    PaintCells(MouseX, MouseY);
});

for (var BrainNo = 0; BrainNo < 10; BrainNo++) {
    Brains.push([]);

    for (var LayerNo = 0; LayerNo < 4; LayerNo++) {
        Brains[BrainNo].push([])

        if (LayerNo < 3) {
            for (var NeuronNo = 0; NeuronNo < GridLength*GridLength; NeuronNo++) {
                Brains[BrainNo][LayerNo].push({
                    Bucket: 0,
                    Weights: []
                });

                for (var WeightNo = 0; WeightNo < GridLength*GridLength; WeightNo++) {
                    Brains[BrainNo][LayerNo][NeuronNo].Weights.push(Math.random()*2);
                }
            }
        } else {
            for (var NeuronNo = 0; NeuronNo < 10; NeuronNo++) {
                Brains[BrainNo][LayerNo].push({
                    Bucket: 0,
                    Weights: []
                });

                for (var WeightNo = 0; WeightNo < GridLength*GridLength; WeightNo++) {
                    Brains[BrainNo][LayerNo][NeuronNo].Weights.push(Math.random()*2);
                }
            }
        }
    }
}

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
                CTX.fillRect(x*CellLength, i*CellLength, CellLength, CellLength);
            }
        }
    }

    requestAnimationFrame(Tick);
}

function ClearGrid () {
    var Row = [];
    Grid.splice(0, Grid.length);

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
        console.log("fffff");
        UndoHistory.splice(UndoHistory.length - 1, 1);
    }
 }

function PaintCells (X, Y) {
    Grid[Math.floor(Y/CellLength)][Math.floor(X/CellLength)] = 1;
}