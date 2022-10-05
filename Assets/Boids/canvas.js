var Group = 0.1;
var Avoid = -0.1;
var Speed = 2;
var Range = 40;
var Align = 0.05;
var BoidAmount = 500;
var BorderMode = 1;

// Controls
var GroupInput = document.getElementById("GroupInput");
var AvoidInput = document.getElementById("AvoidInput");
var SpeedInput = document.getElementById("SpeedInput");
var RangeInput = document.getElementById("RangeInput");
var AlignInput = document.getElementById("AlignInput");
var BoidInput = document.getElementById("BoidInput");
var BorderInput = document.getElementById("BorderInput");

var GroupDisplay = document.getElementById("GroupDisplay");
var AvoidDisplay = document.getElementById("AvoidDisplay");
var SpeedDisplay = document.getElementById("SpeedDisplay");
var RangeDisplay = document.getElementById("RangeDisplay");
var AlignDisplay = document.getElementById("AlignDisplay");
var BoidDisplay = document.getElementById("BoidDisplay");
var BorderDisplay = document.getElementById("BorderDisplay");

GroupDisplay.innerHTML = "<strong>" + Group + "</strong>";
AvoidDisplay.innerHTML = "<strong>" + Avoid + "</strong>";
SpeedDisplay.innerHTML = "<strong>" + Speed + "</strong>";
RangeDisplay.innerHTML = "<strong>" + Range + "</strong>";
AlignDisplay.innerHTML = "<strong>" + Align + "</strong>";
BoidDisplay.innerHTML = "<strong>" + BoidAmount + "</strong>";
BorderDisplay.innerHTML = "<strong>" + BorderMode + "</strong>";

GroupInput.addEventListener("input", function (e) {
    Group = this.valueAsNumber*5/100; // 1 to 16 => 0.05 to 0.8
    GroupDisplay.innerHTML = "<strong>" + Group + "</strong>";
});
AvoidInput.addEventListener("input", function (e) {
    Avoid = this.valueAsNumber*-5/100; // 1 to 16 => -0.05 to -0.8 
    AvoidDisplay.innerHTML = "<strong>" + Avoid + "</strong>";
});
SpeedInput.addEventListener("input", function (e) {
    Speed = this.valueAsNumber;
    SpeedDisplay.innerHTML = "<strong>" + Speed + "</strong>";
});
RangeInput.addEventListener("input", function (e) {
    Range = this.valueAsNumber;
    RangeDisplay.innerHTML = "<strong>" + Range + "</strong>";
    Render();
});
AlignInput.addEventListener("input", function (e) {
    Align = this.valueAsNumber*5/100;  // 1 to 16 => 0.05 to 0.8
    AlignDisplay.innerHTML = "<strong>" + Align + "</strong>";
});
BoidInput.addEventListener("input", function (e) {
    BoidAmount = this.valueAsNumber;
    BoidDisplay.innerHTML = "<strong>" + BoidAmount + "</strong>";
});
BorderInput.addEventListener("input", function (e) {
    BorderMode = this.valueAsNumber;
    BorderDisplay.innerHTML = "<strong>" + BorderMode + "</strong>";
    Render();
});

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


var ResetButton = document.getElementById("Reset");
var Reset = function (Amount) {
    Boids.splice(0, Boids.length)

    for (var i = 0; i < Amount; i++) {
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
};

ResetButton.addEventListener("click", function (e) {Reset(BoidAmount); Render();});

Reset(BoidAmount);

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
    for (var i = 0; i < Boids.length; i++) {
        // Boid interactions
        var Average = [];

        for (var x = 0; x < Boids.length; x++) {
            if (x != i) {
                var XDistance = Boids[x].X - Boids[i].X;
                var YDistance = Boids[x].Y - Boids[i].Y;

                var Distance = Math.sqrt((XDistance)*(XDistance) + (YDistance)*(YDistance));

                if (Distance < Range) {
                    Boids[i].XVel += Avoid * (Distance/XDistance);
                    Boids[i].YVel += Avoid * (Distance/YDistance);
                    Average.push({
                        X: Boids[x].X,
                        Y: Boids[x].Y,
                        XVel: Boids[x].XVel,
                        YVel: Boids[x].YVel,
                        R: Boids[i].R,
                        G: Boids[i].G,
                        B: Boids[i].B
                    });
                }
            }
        }

        // Seperation
        Boids[i].XVel += 0.01*(Speed*Math.sign(Boids[i].XVel) - Boids[i].XVel);
        Boids[i].YVel += 0.01*(Speed*Math.sign(Boids[i].YVel) - Boids[i].YVel);

        // Swarming
        if (Average.length > 0) {
            var XAverage = 0;
            var YAverage = 0;
            var XVelAverage = 0;
            var YVelAverage = 0;
            var RAverage = 0;
            var GAverage = 0;
            var BAverage = 0;
            for (var x = 0; x < Average.length; x++) {
                XAverage += Average[x].X;
                YAverage += Average[x].Y;
                XVelAverage += Average[x].XVel;
                YVelAverage += Average[x].YVel;
                RAverage += Average[x].R;
                GAverage += Average[x].G;
                BAverage += Average[x].B;
            }

            XAverage = XAverage/Average.length;
            YAverage = YAverage/Average.length;
            XVelAverage = XVelAverage/Average.length;
            YVelAverage = YVelAverage/Average.length;
            RAverage = RAverage/Average.length;
            GAverage = GAverage/Average.length;
            BAverage = BAverage/Average.length;

            Boids[i].X += Group*(XAverage - Boids[i].X);
            Boids[i].Y += Group*(YAverage - Boids[i].Y);
            Boids[i].XVel += Align*(XVelAverage - Boids[i].XVel);
            Boids[i].YVel += Align*(YVelAverage - Boids[i].YVel);
            Boids[i].R += Group*(RAverage - Boids[i].R);
            Boids[i].G += Group*(GAverage - Boids[i].G);
            Boids[i].B += Group*(BAverage - Boids[i].B);
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
    }

    Render();

    if (!Pause) { // If paused or not
        requestAnimationFrame(Simulate);
    }
}

function Render () {
    // Background
    var Background = Canvas.getContext("2d");
    Background.fillStyle = "rgb(255, 100, 0)";
    Background.fillRect(0, 0, Canvas.width, Canvas.width);

    for (var i = 0; i < Boids.length; i++) {
        // Drawing the Dot
        var Dot = Canvas.getContext("2d");
        Dot.beginPath();
        Dot.fillStyle = "rgb(" + Boids[i].R + ", " + Boids[i].G + ", " + Boids[i].B + ")";
        Dot.arc(Boids[i].X, Boids[i].Y, 5, 0, 2*Math.PI);
        Dot.fill();

        // Drawing the boundary
        if (BorderMode > 1) {
            var RangeCircle = Canvas.getContext("2d");
            RangeCircle.beginPath();
            RangeCircle.arc(Boids[i].X, Boids[i].Y, Range/(4 - BorderMode), 0, 2*Math.PI);
            RangeCircle.stroke();
        }
    }
}