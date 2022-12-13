var Canvas = document.getElementById("Canvas");
var Agents = [/*
    {
        X: 0,
        Y: 0,
        XVel: 10,
        YVel: 10,
        Type: 0 (Paper: 0 | Scissors: 1 | Rock: 2)
    }
*/];
var Paper = new Image();
var Scissors = new Image();
var Rock = new Image();
Paper.src = "Assets/Paper.png";
Scissors.src = "Assets/Scissors.png";
Rock.src = "Assets/Rock.png";

if (window.innerHeight < window.innerWidth) {
    Canvas.style.height = Canvas.style.width = window.innerHeight/2 + "px";
} else {
    Canvas.style.height = Canvas.style.width = window.innerWidth/2 + "px";
}

for (var i = 0; i < 3; i++) {
    for (var x = 0; x < 5; x++) {
        Agents.push({
            X: Math.random() * window.innerWidth/2,
            Y: Math.random() * window.innerHeight/2,
            XVel: Math.floor(Math.random() * 10),
            YVel: Math.floor(Math.random() * 10),
            Type: i
        });
    }
}

Simulate();

function Simulate () {
    Render();

    requestAnimationFrame(Simulate);
}

function Render () {
    for (var i = 0; i < Agents.length; i++) {
        let Agent = Canvas.getContext("2D");

        if (Agents[i].Type = 0) {
            Paper.onload = function () {
                Agent.drawImage(Paper, Agents[i].X, Agents[i].Y, 50, 50);
            }
        } else if (Agents[i].Type = 1) {
            Scissors.onload = function () {
                Agent.drawImage(Scissors, Agents[i].X, Agents[i].Y, 50, 50);
            }
        } else if (Agents[i].Type = 2) {
            Rock.onload = function () {
                Agent.drawImage(Rock, Agents[i].X, Agents[i].Y, 50, 50);
            }
        }
    }
}