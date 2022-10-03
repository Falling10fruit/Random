const Group = 0.05;
const Avoid = -0.2;
const Speed = 5;
const Range = 50; // Higher probably cause more lag
const Align = 0.05;

// Sizing and positioning Canvas
var Canvas = document.getElementById("Canvas");
Canvas.zIndex = -1;
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;
Canvas.style.position = "fixed";
Canvas.style.top = "0px";
Canvas.style.left = "0px";

// Generate boids
var Boids = [/*{
    X: 1000, // X position
    Y: 500, // Y position
    XVel: -1, // X Velocity
    YVel: 0, // Y Velocity
}*/];

for (var i = 0; i < 100; i++) {
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

// Pause Button
var Pause = false;
var PauseButton = document.getElementById("Pause");
PauseButton.style.width = PauseButton.getBoundingClientRect().width + "px";
PauseButton.addEventListener("click", function (e) {
    if (Pause) {
        Pause = false;
        Simulate();
        PauseButton.innerHTML = "<strong>Running!</strong>";
        PauseButton.style.color = "Green";
    } else {
        Pause = true;
        PauseButton.innerHTML = "<strong>Paused</strong>";
        PauseButton.style.color = "Red";
    }
});

// Simulation
Simulate();

function Simulate () {
    // Background
    var Background = Canvas.getContext("2d");
    Background.fillStyle = "rgb(255, 100, 0)";
    Background.fillRect(0, 0, Canvas.width, Canvas.width);

    for (var i = 0; i < Boids.length; i++) { //This runs
        for (var x = 0; x < Boids.Length; x++) { // This doesn't
            console.log("x");

            if (x != i) {
                var XDistance = Boids[x].X - Boids[i].X;
                var YDistance = Boids[x].Y - Boids[i].Y;

                var Distance = Math.sqrt((XDistance)*(XDistance) + (YDistance)*(YDistance));

                if (Distance < Range) {
                    Boids[i].XVel += Avoid * (Distance/XDistance);
                    Boids[i].YVel += Avoid * (Distance/YDistance);
                }
            }
        }

        Boids[i].X += Boids[i].XVel;
        Boids[i].Y += Boids[i].YVel;

        // Putting the boids on the other side of the screen
        if (Boids[i].X > Canvas.width + 5) {
            Boids[i].X = -5;
        } else if (Boids[i].X < -5) {
            Boids[i].X = Canvas.width + 5;
        } else if (Boids[i].Y > Canvas.height + 5) {
            Boids[i].Y = -5;
        } else if (Boids[i].Y < -5) {
            Boids[i].Y = Canvas.height + 5;
        }

        // Drawing the Dot
        var Dot = Canvas.getContext("2d");
        Dot.beginPath();
        Dot.fillStyle = "rgb(" + Boids[i].R + ", " + Boids[i].G + ", " + Boids[i].B + ")";
        Dot.arc(Boids[i].X, Boids[i].Y, 5, 0, 2*Math.PI);
        Dot.fill();
    }

    if (!Pause) { // If paused or not
        requestAnimationFrame(Simulate);
    }
}