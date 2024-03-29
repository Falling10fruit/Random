const Canvas = document.getElementById("Canvas");
const CTX = Canvas.getContext("2d");

Canvas.width = document.body.clientWidth;
Canvas.height = window.innerHeight*3/4;

window.addEventListener("resize", function () {
    Canvas.width = document.body.clientWidth;
    Canvas.height = window.innerHeight*3/4;

    Render();
});

var Balls = [/*
    {
        X: 0,
        Y: 0,
        XVel: 0,
        YVel: 0,
        Radius: 0
    }*/
];
var Lines = [/*
    {
        FirstDot: {
            X: 0,
            Y: 0
        },
        SecondDot: {
            X: 0,
            Y: 0
        }
    }*/
];
var HisStory = [/*
    [
        {
            FirstDot: {
                X: 0,
                Y: 0
            },
            SecondDot: {
                X: 0,
                Y: 0
            }
        }
    ]*/
];
var Intersections = [/*
    {
        X: 0,
        Y: 0
    }*/
];
var NewLine = {
    FirstDot: {
        X: -1,
        Y: 0
    },
    SecondDot: {
        X: 0,
        Y: 0
    }
};
var Analysis = {
    CurrentlyAnalyzing: false,
    Id: -1
};
var MouseX;
var MouseY;
var PastMouseX;
var PastMouseY;
var Pause = false;
var Debug = false;
var ToggleBackgroundOpacity = true;
var Scene = "Simulate";
var Frames = 0;

window.addEventListener("mousemove", function (e) {
    PastMouseX = MouseX;
    PastMouseY = MouseY;
    MouseX = e.clientX;
    MouseY = e.clientY;

    if (Scene == "Analysis") {
        let AnyBallsHovered = false;

        for (let i = 0; i < Balls.length; i++) {
            if (DistanceBetween(MouseX, MouseY, Balls[i].X, Balls[i].Y) <= Balls[i].Radius + 10) {
                Analysis.Id = i;
                AnyBallsHovered = true;
            }
        }

        if (!AnyBallsHovered) {
            Analysis.Id = -1;
        }

        Render();
    }
});

window.addEventListener("keypress", function (e) {
    if (e.key == 1) {
        Balls.push({
            X: MouseX,
            Y: MouseY,
            XVel: MouseX - PastMouseX,
            YVel: MouseY - PastMouseY,
            Radius: 2
        });
    } else if (e.key == 2) {
        Balls.push({
            X: MouseX,
            Y: MouseY,
            XVel: MouseX - PastMouseX,
            YVel: MouseY - PastMouseY,
            Radius: 5
        });
    } else if (e.key == 3) {
        Balls.push({
            X: MouseX,
            Y: MouseY,
            XVel: MouseX - PastMouseX,
            YVel: MouseY - PastMouseY,
            Radius: 10
        });
    } else if (e.key === "Space") {
        console.log("Ohio");
        PauseButtonFunction();
    } else if (e.key === "z" && e.ctrlKey) {
        UndoButtonFunction();
    };
});

Canvas.addEventListener("mousedown", function () {
    if (Scene == "Simulate") {
        NewLine.FirstDot.X = MouseX;
        NewLine.FirstDot.Y = MouseY;
    } else if (Scene == "Analysis" && Analysis.Id != -1) {
        if (Analysis.Id != -1) {
            Analysis.CurrentlyAnalyzing = true;
        }

        Scene = "Simulate"
        Pause = false;
        requestAnimationFrame(Tick);
        
        let PauseButton = document.getElementById("PauseButton");
        let AnalysisButton = document.getElementById("AnalysisButton");
        
        PauseButton.innerText = "You're just a cell lab rip off";
        AnalysisButton.innerText = "Change ball?";
    }
});

Canvas.addEventListener("mouseup", function () {
    if (NewLine.FirstDot.X != -1) {
        HisStory.push(Lines.slice());

        let SecondMouseX = MouseX;
        let SecondMouseY = MouseY;


        if (SecondMouseX < NewLine.FirstDot.X) {
            NewLine.SecondDot.X = NewLine.FirstDot.X;
            NewLine.SecondDot.Y = NewLine.FirstDot.Y;
            NewLine.FirstDot.X = SecondMouseX;
            NewLine.FirstDot.Y = SecondMouseY;
        } else {
            NewLine.SecondDot.X = SecondMouseX;
            NewLine.SecondDot.Y = SecondMouseY;
        }

        Lines.push(JSON.parse(JSON.stringify(NewLine)));
        NewLine.FirstDot.X = -1;
    }
});

Tick();

function Tick () {
    Intersections.splice(0, Intersections.length);

    for (let i = 0; i < Balls.length; i++) {
        if (Balls[i].Y > Canvas.height + 100) {
            Balls.splice(i, 1);

            if (Analysis.Id == i) {
                Analysis.CurrentlyAnalyzing = false;
                Analysis.Id = -1;
            } else if (Analysis.Id >= i) {
                Analysis.Id--
            }
        } else {
            SimulateBall(i);
        }
    }

    Render();

    Frames++

    if (!Pause) {
        requestAnimationFrame(Tick);
    }
}

function Render () {
    if (ToggleBackgroundOpacity) {
        CTX.fillStyle = "rgba(255, 255, 255, 0.1)";
    } else {
        CTX.fillStyle = "rgb(255, 255, 255)";
    }

    if (Pause) {
        for (let i = 0; i < 20; i++) {
            CTX.fillRect(0, 0, Canvas.width, Canvas.height);
        }
    } else {
        CTX.fillRect(0, 0, Canvas.width, Canvas.height);
    }

    if (Scene == "Analysis") {
        CTX.fillStyle = "rgba(75, 75, 75, 0.2)";
        CTX.fillRect(0, 0, Canvas.width, Canvas.height);

        for (let i = 0; i < Balls.length; i++) {
            CTX.fillStyle = "rgb(255, 255, 255)";
            CTX.beginPath();
            CTX.ellipse(Balls[i].X, Balls[i].Y, Balls[i].Radius + 10, Balls[i].Radius + 10, 0, 0, Math.PI*2);
            
            if (Analysis.Id == i) {
                CTX.fillStyle = "rgb(225, 225, 100)";
                CTX.fill();

                CTX.fillStyle = "rgb(0, 0, 0)";
                CTX.textAlign = "left";
                CTX.font = "15px Arial";
                CTX.fillText("Id:" + i, MouseX + 10, MouseY - 20);
            } else {
                CTX.fill();
            }
        }

        CTX.fillStyle = "rgb(0, 0, 0)";
        CTX.textAlign = "center";
        CTX.font = "30px Arial";
        CTX.fillText("Click on circle you wanna analyze", Canvas.width/2, 50, Canvas.width);
    }


    if (NewLine.FirstDot.X != -1) {
        CTX.beginPath();
        CTX.moveTo(NewLine.FirstDot.X, NewLine.FirstDot.Y);
        CTX.lineTo(MouseX, MouseY);
        CTX.stroke();
    }

    for (let i = 0; i < Lines.length; i++) {
        CTX.beginPath();
        CTX.moveTo(Lines[i].FirstDot.X, Lines[i].FirstDot.Y);
        CTX.lineTo(Lines[i].SecondDot.X, Lines[i].SecondDot.Y);
        CTX.stroke();
    }

    for (let i = 0; i < Balls.length; i++) {
        CTX.beginPath();
        CTX.ellipse(Balls[i].X, Balls[i].Y, Balls[i].Radius, Balls[i].Radius, 0, 0, Math.PI*2);
        CTX.stroke();

        if (Analysis.CurrentlyAnalyzing && Analysis.Id == i) {
            CTX.setLineDash([5, 5]);
            CTX.beginPath();
            CTX.ellipse(Balls[i].X, Balls[i].Y, Balls[i].Radius + 5, Balls[i].Radius + 5,   Math.floor(Frames/10), 0, Math.PI*2);
            CTX.stroke();
            CTX.setLineDash([]);
        }
    }

    if (Debug) {
         for (let i = 0; i < Intersections.length; i++) {
            CTX.beginPath();
            CTX.ellipse(Intersections[i].X, Intersections[i].Y, 10, 10, 0, 0, Math.PI*2);
            CTX.stroke();
        }
    }

    if (Analysis.CurrentlyAnalyzing) {
        CTX.fillStyle = "rgb(0, 0, 0)";
        CTX.textAlign = "left";
        CTX.font = Canvas.height/25 + "px Arial";
        CTX.fillText("Ball's XVel: " + Balls[Analysis.Id].XVel, 10, Canvas.height - Canvas.height/25*3 - 10);
        CTX.fillText("Ball's YVel: " + Balls[Analysis.Id].YVel, 10, Canvas.height - Canvas.height/25*2 - 10);
        CTX.fillText("Ball's Speed: " + DistanceBetween(0, 0, Balls[Analysis.Id].XVel, Balls[Analysis.Id].YVel), 10, Canvas.height - Canvas.height/25 - 10);
        CTX.fillText("Ball's Angle: " + Math.atan(Balls[Analysis.Id].YVel/Balls[Analysis.Id].XVel), 10, Canvas.height - 10);
    }
}

function SimulateBall(i) {
    for (let MoveInTenSmallerStepsToNotMissLines = 0; MoveInTenSmallerStepsToNotMissLines < 10; MoveInTenSmallerStepsToNotMissLines++) {
        Balls[i].X += Balls[i].XVel/10;
        Balls[i].Y += Balls[i].YVel/10;

        for (let x = 0; x < Lines.length; x++) {
            let IntersectionX = GetIntelAboutCollidingline(i, x).X;
            let IntersectionY = GetIntelAboutCollidingline(i, x).Y;

            if (MoveInTenSmallerStepsToNotMissLines == 9) {
                Intersections.push({X: IntersectionX, Y: IntersectionY});
            }

            if (DistanceBetween(IntersectionX, IntersectionY, Balls[i].X, Balls[i].Y) <= Balls[i].Radius + 1) {
                BallLineBump(i, x);
            }
        }
    } 

    Balls[i].YVel++;

    Balls[i].XVel = Balls[i].XVel * 0.96;
    Balls[i].YVel = Balls[i].YVel * 0.9;   
}

function GetIntelAboutCollidingline (i, x) {
    let X1 = Lines[x].FirstDot.X - Balls[i].X;
    let X2 = Lines[x].SecondDot.X - Balls[i].X;
    let Y1 = Lines[x].FirstDot.Y - Balls[i].Y;
    let Y2 = Lines[x].SecondDot.Y - Balls[i].Y;
    let IntersectionX, IntersectionY;
    let M, K, Denominator;

    if (Lines[x].SecondDot.X - Lines[x].FirstDot.X == 0) {
        IntersectionX = Lines[x].SecondDot.X;
        IntersectionY = Balls[i].Y;
    } else {
        M = (Y2 - Y1)/(X2 - X1);
        K = X1*-M + Y1;
        Denominator = M*M + 1;

        IntersectionX = -M*K/Denominator + Balls[i].X;
        IntersectionY = K/Denominator + Balls[i].Y;
    }

    IntersectionX = Math.min(X2 + Balls[i].X, Math.max(IntersectionX, X1 + Balls[i].X));

    if (Lines[x].FirstDot.Y < Lines[x].SecondDot.Y) {
        Y1 = Lines[x].FirstDot.Y;
        Y2 = Lines[x].SecondDot.Y
    } else {
        Y1 = Lines[x].SecondDot.Y;
        Y2 = Lines[x].FirstDot.Y;
    }

    IntersectionY = Math.min(Y2, Math.max(IntersectionY, Y1));

    return {X: IntersectionX, Y: IntersectionY, M: M, K: K};
}

function DistanceBetween(X1, Y1, X2, Y2) {
    let DistanceX = X2 - X1;
    let DistanceY = Y2 - Y1;
    
    return Math.sqrt(DistanceX*DistanceX + DistanceY*DistanceY);
}

function BallLineBump (i, x) {
    let M = GetIntelAboutCollidingline(i, x).M;

    if (Lines[x].SecondDot.X - Lines[x].FirstDot.X == 0) {
        Balls[i].XVel = -1*Balls[i].XVel;
    } else {
        let Speed = DistanceBetween(0, 0, Balls[i].XVel, Balls[i].YVel);
        let BallAngle;
        let LineAngle;

        if (Balls[i].YVel > 0) {
            if (Balls[i].XVel > 0) {
                BallAngle = Math.atan(Balls[i].YVel/Balls[i].XVel * Math.PI/180);
            } else {
                BallAngle = Math.atan(Math.abs(Balls[i].XVel)/Balls[i].YVel * Math.PI/180) + 90;
            }
        } else {
            if (Balls[i].XVel > 0) {
                BallAngle = Math.atan(Math.abs(Balls[i].YVel)/Math.abs(Balls[i].XVel) * Math.PI/180) + 180;
            } else {
                BallAngle = Math.atan(Balls[i].XVel/Math.abs(Balls[i].YVel) * Math.PI/180) + 270;
            }
        }

        if (!(M <= 0)) {
            LineAngle = Math.atan(M * Math.PI/180);
        } else {
            LineAngle = Math.atan((Lines[x].SecondDot.X - Lines[x].FirstDot.X)/Math.abs(Lines[x].SecondDot.Y - Lines[x].FirstDot.Y) * Math.PI/180) + 90;
        }

        let Angle = 2*LineAngle - BallAngle;

        if (Angle < 0) {
            Angle = 360 - Math.abs(Angle);
        }

        if (Angle > 90) {
            Angle -= 90;
        }

        if (Angle > 180) {
            Angle -= 90;
        }
        if (Angle > 270) {
            Angle -= 90;
        }

        Balls[i].XVel = Math.cos(Angle * Math.PI/180) * Speed;
        Balls[i].YVel = Math.sin(Angle * Math.PI/180) * Speed;

        if (Angle >= 90) {
            Balls[i].XVel = -1*Balls[i].XVel;
        }

        if (Angle >= 180) {
            Balls[i].YVel = -1*Balls[i].YVel;
        }

        if (Angle >= 270) {
            Balls[i].XVel = -1*Balls[i].XVel;
        }
    }
}

function DebugButtonFunction () {
    let DebugButton = document.getElementById("DebugButton");

    if (Debug) {
        Debug = false;
        DebugButton.innerText = "Never again";
    } else {
        Debug = true;
        DebugButton.innerText = "Spamming now lags";
    }

    Render();
}

function RemoveLinesButtonFunction () {
    HisStory.push(Lines.slice());
    Lines.splice(0, Lines.length);
    
    Render();
}

function RemoveBallsButtonFunction () {
    Balls.splice(0, Balls.length);
    Analysis.CurrentlyAnalyzing = false;
    Analysis.Id = -1;
    Render();
}

function PauseButtonFunction () {
    let PauseButton = document.getElementById("PauseButton");

    if (Pause) {
        Pause = false;
        requestAnimationFrame(Tick);
        PauseButton.innerText = "Whonna staph euogain?";

        if (Scene == "Analysis") {
            let AnalysisButton = document.getElementById("AnalysisButton");

            Scene = "Simulate";

            PauseButton.innerText = "HAH, YOU CLICKED ME INSTEAD OF HIM";
            AnalysisButton.innerText = "He thinks my non existant insecurity is funny, how sad";
        }
    } else {
        Pause = true;
        PauseButton.innerText = "Sthapped";
    }
}

function UndoButtonFunction () {
    if (HisStory.length > 0) {
        Lines = HisStory[HisStory.length - 1].slice();
        HisStory.splice(HisStory.length - 1, 1);
    }
    
    Render();
}

function AnalysisButtonFunction () {
    let AnalysisButton = document.getElementById("AnalysisButton");
    let PauseButton = document.getElementById("PauseButton");

    if (Scene == "Simulate") {
        Scene = "Analysis";

        if (Pause) {
            PauseButton.innerText = "HA, even if pressing you would cause the same thing, he pressed me first";
            AnalysisButton.innerText = "Maybe the user changed his mind";
        } else {
            Pause = true;
        
            PauseButton.innerText = "Ah analysis, now both me and the analysis button are basically unpause";
            AnalysisButton.innerText = "Don't listen to him, he's just being mean about my practicality";
        }

        Render();
    } else if (Scene == "Analysis") {
        Scene = "Simulate";
        Pause = false;

        requestAnimationFrame(Tick);

        PauseButton.innerText = "We could have a pause menu if you didn't exist";
        AnalysisButton.innerText = "You talk too much";
    }
}

function BackgroundButtonFunction () {
    let BackgroundButton = document.getElementById("BackgroundButton");

    if (ToggleBackgroundOpacity) {
        ToggleBackgroundOpacity = false;

        BackgroundButton.innerText = "No more shadow";
    } else {
        ToggleBackgroundOpacity = true;

        BackgroundButton.innerText = "You see past";
    }
}