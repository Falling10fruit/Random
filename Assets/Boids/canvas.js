const Group = 0.05;
const Avoid = -0.2;
const Speed = 5;
const Range = 50; // Higher probably cause more lag
const Align = 0.05;

var Canvas = document.getElementById("Canvas");
Canvas.zIndex = -1;
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;
Canvas.style.position = "fixed";
Canvas.style.top = "0px";
Canvas.style.left = "0px";

var Boids = [/*{
    X: 1000, // X position
    Y: 500, // Y position
    XVel: -1, // X Velocity
    YVel: 0, // Y Velocity
}*/];

for (var i = 0; i < 500; i++) {
    Boids.push({
        X: Math.random()*Canvas.width,
        Y: Math.random()*Canvas.height,
        XVel: (Math.random()*2 - 1)*(Math.random()*Speed + Speed/2),
        YVel: (Math.random()*2 - 1)*(Math.random()*Speed + Speed/2),
        R: Math.random()*255,
        G: Math.random()*255,
        B: Math.random()*255
    });
}

var Pause = false;
var PauseButton = document.getElementById("Pause");
PauseButton.addEventListener("click", function (e) {
    console.log("Working?");
    if (Pause) {
        Pause = false;
        Simulate();
        PauseButton.innerHTML = "<strong>Running!</strong>";
        PauseButton.style.color = "Green";
        console.log("Running!");
    } else {
        Pause = true;
        PauseButton.innerHTML = "<strong>Paused</strong>";
        PauseButton.style.color = "Red";
        console.log("Paused!");
    }
});

Simulate();

function Simulate () {
    var Background = Canvas.getContext("2d");
    Background.fillStyle = "rgb(255, 100, 0)";
    Background.fillRect(0, 0, Canvas.width, Canvas.width);

    for (var i = 0; i < Boids.length; i++) {
        let LocalX, LocalY = null;

        for (var x = 0; x < Boids.Length; x++) {
            if (x != i) {
                let Distance = Math.sqrt((Boids[x].X - Boids[i].X)*(Boids[x].X - Boids[i].X) + (Boids[x].Y - Boids[i].Y)*(Boids[x].Y - Boids[i].Y));

                if (Distance < Range) {
                }
            }
        }

        Boids[i].XVel += Group * LocalX;
        Boids[i].YVel += Group * LocalY;

        Boids[i].X += Boids[i].XVel;
        Boids[i].Y += Boids[i].YVel;

        if (Boids[i].X > Canvas.width + 5) {
            Boids[i].X = -5;
        } else if (Boids[i].X < -5) {
            Boids[i].X = Canvas.width + 5;
        } else if (Boids[i].Y > Canvas.height + 5) {
            Boids[i].Y = -5;
        } else if (Boids[i].Y < -5) {
            Boids[i].Y = Canvas.height + 5;
        }

        var Dot = Canvas.getContext("2d");
        //Dot.styleFill = "rgb(" + Boids[i].R + ", " + Boids[i].G + ", " + Boids[i].B+  ")";
        Dot.beginPath();
        Dot.fillStyle = "rgb(0, 0, 0)";
        Dot.arc(Boids[i].X, Boids[i].Y, 5, 0, 2*Math.PI);
        Dot.fill();
    }

    if (!Pause) {
        requestAnimationFrame(Simulate);
    }
}