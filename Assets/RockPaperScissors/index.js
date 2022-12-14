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
            X: window.innerWidth/8 * (i + 1),
            Y: window.innerHeight/12 * (x + 1),
            XVel: Math.floor(Math.random() * 10),
            YVel: Math.floor(Math.random() * 10),
            Type: i
        });
    }
}

Simulate();

function Simulate () {
    for (var i = 0; i < Agents.length; i++) { // Collision
        for (var x = 0; x < Agents.length; x++) {
            if (i != x) {

            }
        }
    }

    Render();

    requestAnimationFrame(Simulate);
}

function Render () {
    for (var i = 0; i < Agents.length; i++) {
        var Agent = Canvas.getContext("2d");

        Agent.beginPath();
        Agent.fillStyle = "rgb(0, 0, 0)";
        Agent.arc(Agents[i].X, Agents[i].Y, 5, 0, Math.PI * 2);
        Agent.fill();

        /*if (Agents[i].Type = 0) {
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
        }*/
    }
}