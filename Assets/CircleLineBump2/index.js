const Canvas = document.getElementById("Canvas");
const CTX = Canvas.getContext("2d");

Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight*3/4;

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
var MouseX;
var MouseY;
var PastMouseX;
var PastMouseY;

window.addEventListener("mousemove", function (e) {
    PastMouseX = MouseX;
    PastMouseY = MouseY;
    MouseX = e.clientX;
    MouseY = e.clientY;
});

window.addEventListener("keypress", function (e) {
    if (e.key == 1) {
        Balls.push({
            X: MouseX,
            Y: MouseY,
            XVel: MouseX - PastMouseX,
            YVel: MouseY - PastMouseY,
            Radius: 10
        });
    }
});

Canvas.addEventListener("mousedown", function () {
    NewLine.FirstDot.X = MouseX;
    NewLine.FirstDot.Y = MouseY;
});

Canvas.addEventListener("mouseup", function () {
    NewLine.SecondDot.X = MouseX;
    NewLine.SecondDot.Y = MouseY;

    Lines.push(JSON.parse(JSON.stringify(NewLine)));
    NewLine.FirstDot.X = -1;
});

Tick();

function Tick () {
    for (let i = 0; i < Balls.length; i++) {
        if (Balls[i].Y > Canvas.height + 100) {
            Balls.splice(i, 1);
        } else {
            SimulateBall(i);
        }
    }

    Render();

    requestAnimationFrame(Tick);
}

function Render () {
    CTX.fillStyle = "rgba(255, 255, 255, 0.1)";
    CTX.fillRect(0, 0, Canvas.width, Canvas.height);

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
    }
}

function SimulateBall(i) {
    for (let MoveInTenSmallerStepsToNotMissLines = 0; MoveInTenSmallerStepsToNotMissLines < 10; MoveInTenSmallerStepsToNotMissLines++) {
        Balls[i].X += Balls[i].XVel/10;
        Balls[i].Y += Balls[i].YVel/10;

        for (let x = 0; x < Lines.length; x++) {
            let IntersectionX = GetIntelAboutCollidingline(i, x).X;
            let IntersectionY = GetIntelAboutCollidingline(i, x).Y;

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
    let X1, X2, Y1, Y2;
    let IntersectionX, IntersectionY;
    let M, K, Denominator;

    if (Lines[x].FirstDot < Lines[x].SecondDot) {
        X1 = Lines[x].FirstDot.X - MouseX;
        X2 = Lines[x].SecondDot.X - MouseX;
        Y1 = Lines[x].FirstDot.Y - MouseY;
        Y2 = Lines[x].SecondDot.Y - MouseY;
    } else {
        X1 = Lines[x].SecondDot.X - MouseX;
        X2 = Lines[x].FirstDot.X - MouseX;
        Y1 = Lines[x].SecondDot.Y - MouseY;
        Y2 = Lines[x].FirstDot.Y - MouseY;
    }


    if (Lines[x].SecondDot.X - Lines[x].FirstDot.X == 0) {
        IntersectionX = Lines[x].SecondDot.X;
        IntersectionY = Balls[i].Y;
    } else {
        M = (Y2 - Y1)/(X2 - X1);
        K = X1*-M + Y1;
        Denominator = M*M + 1;

        IntersectionX = -M*K/Denominator + MouseX;
        IntersectionY = K/Denominator + MouseY;
    }

    IntersectionX = Math.min(X2 + MouseX, Math.max(IntersectionX, X1 + MouseX));

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
        2*Math.tan(M) - Math.tan(Balls[i].YVel/Balls[i].XVel);
    }
}
