const Canvas = document.getElementById("Canvas");
const CTX = Canvas.getContext("2d");

Canvas.width = Canvas.height = window.innerHeight/2;

var Lines = [/*
    {
        FirstDot: {
            X: 25,
            Y: 400
        },
        SecondDot: {
            X: 400,
            Y: 100
        },
        Touched: false
    }*/
];
var NewLine = {
    FirstDot: {
        X: 0,
        Y: 0
    },
    SecondDot: {
        X: 0, 
        Y: 0
    },
    Touched: true
};
var MouseX;
var MouseY;
var X;
var Y;

Canvas.addEventListener("mousemove", function (e) {
    MouseX = e.clientX - Canvas.getBoundingClientRect().x - 5;
    MouseY = e.clientY - Canvas.getBoundingClientRect().y - 5;
});

Canvas.addEventListener("mousedown", function (e) {
    NewLine.FirstDot.X = MouseX;
    NewLine.FirstDot.Y = MouseY;
    NewLine.Touched = false;
});

Canvas.addEventListener("mouseup", function (e) {
    NewLine.SecondDot.X = MouseX;
    NewLine.SecondDot.Y = MouseY;

    Lines.push(JSON.parse(JSON.stringify(NewLine)));
    NewLine.Touched = true;
})

Tick();

function Tick () {
    if (NewLine.Touched == true) {
        for (let i = 0; i < Lines.length; i++) {
            let X1, X2, Y1, Y2;

            if (Lines[i].FirstDot.X < Lines[i].SecondDot.X) {
                X1 = Lines[i].FirstDot.X - MouseX;
                X2 = Lines[i].SecondDot.X - MouseX;
                Y1 = Lines[i].FirstDot.Y - MouseY;
                Y2 = Lines[i].SecondDot.Y - MouseY;
            } else {
                X1 = Lines[i].SecondDot.X - MouseX;
                X2 = Lines[i].FirstDot.X - MouseX;
                Y1 = Lines[i].SecondDot.Y - MouseY;
                Y2 = Lines[i].FirstDot.Y - MouseY;
            }

            let M = (Y2 - Y1)/(X2 - X1);
            let K = X1*-M + Y1;

            let Denominator = M*M + 1;
            X = -M*K/Denominator + MouseX;
            Y = K/Denominator + MouseY;

            X = Math.max(X1 + MouseX, Math.min(X, X2 + MouseX));

            if (Lines[i].FirstDot.Y < Lines[i].SecondDot.Y) {
                Y1 = Lines[i].FirstDot.Y - MouseY;
                Y2 = Lines[i].SecondDot.Y - MouseY;
            } else {
                Y1 = Lines[i].SecondDot.Y - MouseY;
                Y2 = Lines[i].FirstDot.Y - MouseY;
            }

            Y = Math.max(Y1 + MouseY, Math.min(Y, Y2 + MouseY));

            let XDistance = X - MouseX;
            let YDistance = Y - MouseY;

            if (Math.sqrt(XDistance*XDistance + YDistance*YDistance) < 5) {
                Lines[i].Touched = true;
            } else {
                Lines[i].Touched = false;
            }
        }
    }

    Render();

    requestAnimationFrame(Tick);
};

function Render () {
    CTX.fillStyle = "rgb(255, 255, 255)";
    CTX.fillRect(0, 0, Canvas.width, Canvas.height);

    CTX.beginPath();
    
    for (let i = 0; i < Lines.length; i++) {
        if (Lines[i].Touched) {
            CTX.strokeStyle = "rgb(255, 100, 0)";
            console.log("Oof");
        } else {
            CTX.strokeStyle = "rgb(0, 0, 0)";
        }

        CTX.moveTo(Lines[i].FirstDot.X, Lines[i].FirstDot.Y);
        CTX.lineTo(Lines[i].SecondDot.X, Lines[i].SecondDot.Y);
    }

    CTX.strokeStyle = "rgb(0, 0, 0)";

    CTX.stroke();

    if (NewLine.Touched == false) {
        CTX.beginPath();
        CTX.moveTo(NewLine.FirstDot.X, NewLine.FirstDot.Y);
        CTX.lineTo(MouseX, MouseY);
        CTX.stroke();
    } else {
        CTX.beginPath();
        CTX.ellipse(MouseX, MouseY, 10, 10, 0, 0, Math.PI * 2);
        CTX.stroke();
        CTX.beginPath();
        CTX.ellipse(X, Y, 10, 10, 0, 0, Math.PI * 2);
        CTX.stroke();
    }
};