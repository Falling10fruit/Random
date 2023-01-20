var Canvas = document.getElementById("Canvas");
var Agents = [/*{
        X: 100,
        Y: 300,
        XVel: 8,
        YVel: 0,
        Type: 0 /*(Paper: 0 | Scissors: 1 | Rock: 2)*
    }, {
        X: 200,
        Y: 300,
        XVel: 4,
        YVel: 0,
        Type: 0
    }, {
        X: 300,
        Y: 300,
        XVel: -4,
        YVel: 0,
        Type: 0
    }*/];
var Paper = new Image();
var Scissors = new Image();
var Rock = new Image();
Paper.src = "Assets/Paper.png";
Scissors.src = "Assets/Scissors.png";
Rock.src = "Assets/Rock.png";

if (window.innerHeight < window.innerWidth) {
    Canvas.height = Canvas.width = window.innerHeight/2;
} else {
    Canvas.height = Canvas.width = window.innerWidth/2;
}

for (var i = 0; i < 3; i++) {
    for (var x = 0; x < 5; x++) {
        Agents.push({
            X: Math.round(Canvas.getBoundingClientRect().width/4 * (i + 1)),
            Y: Math.round(Canvas.getBoundingClientRect().height/6 * (x + 1)),
            XVel: (Math.floor(Math.random() * 3)*2 + 2) * (Math.floor(Math.random()*2)*2 - 1),
            YVel: (Math.floor(Math.random() * 4)*2 + 2) * (Math.floor(Math.random()*2)*2 - 1),
            Type: i
        });
    }
}

Simulate();

function Simulate () {

    // Collision

    var DelayedForce = [/*{XVel: 10, YVel: 10, Type: 0}*/]; // Uneven distribution due to premature velocity tampering

    for (var i = 0; i < Agents.length; i++) {
        DelayedForce.push({
            XVel: 0,
            YVel: 0,
            Type: Agents[i].Type
        });
    }

    for (var i = 0; i < Agents.length; i++) {
        if (Agents[i].X - 5 < 0 || Agents[i].X + 5 > Canvas.width) {
            Agents[i].XVel = -Agents[i].XVel
        }

        if (Agents[i].Y - 5 < 0 || Agents[i].Y + 5 > Canvas.height) {
            Agents[i].YVel = -Agents[i].YVel
        }

        for (var x = 0; x < Agents.length; x++) {
            if (i != x) {
                let XDist = Math.abs(Agents[x].X - Agents[i].X);
                let YDist = Math.abs(Agents[x].Y - Agents[i].Y);

                if (XDist < 10 && YDist < 10) {
                    if (XDist > YDist) {
                        DelayedForce[i].XVel += Agents[i].XVel/2 * -3;
                        DelayedForce[x].XVel += Agents[i].XVel/2;
                    } else {
                        DelayedForce[i].YVel += Agents[i].YVel/2 * -3;
                        DelayedForce[x].YVel += Agents[i].YVel/2;
                    }

                    if (Agents[i].Type == 0) {
                        if (Agents[x].Type == 2) {
                            DelayedForce[x].Type = 0;
                        }
                    } else if (Agents[i].Type == 1) {
                        if (Agents[x].Type == 0) {
                            DelayedForce[x].Type = 1;
                        }
                    } else if (Agents[i].Type == 2) {
                        if (Agents[x].Type == 1) {
                            DelayedForce[x].Type = 2;
                        }
                    }
                }
            }
        }
    }

    for (var i = 0; i < DelayedForce.length; i++) {
        Agents[i].XVel += DelayedForce[i].XVel;
        Agents[i].YVel += DelayedForce[i].YVel;
        Agents[i].Type = DelayedForce[i].Type;
    }

    for (var i = 0; i < Agents.length; i++) {
        Agents[i].X += Agents[i].XVel;
        Agents[i].Y += Agents[i].YVel;
    }

    Render();

    for (var i = 1; i < Agents.length; i++) {
        if (Agents[i].Type != Agents[0].Type) {
            requestAnimationFrame(Simulate);
            break;
        } else if (i == Agents.length - 1) {
            End();
        }
    }

}

function Render () {
    //Background
    var Background = Canvas.getContext("2d");
    Background.fillStyle = "rgb(255, 255, 255)";
    Background.fillRect(0, 0, Canvas.width, Canvas.height);
    Background.fill();

    for (var i = 0; i < Agents.length; i++) {
        var Agent = Canvas.getContext("2d");

        Agent.beginPath();
        Agent.fillStyle = "rgb(0, 0, 0)";
        Agent.textAlign = "center";
        Agent.fillText(Agents[i].Type, Agents[i].X + 5, Agents[i].Y - 5);
        /*Agent.fillStyle = "rgba(0, 0, 0, 1)";
        Agent.fillRect(Agents[i].X - 5, Agents[i].Y - 5, 10, 10);
        Agent.fill();*/

        if (Agents[i].Type == 0) {
            Agent.drawImage(Paper, Agents[i].X - 10, Agents[i].Y - 10, 20, 20);
        } else if (Agents[i].Type == 1) {
            Agent.drawImage(Scissors, Agents[i].X - 10, Agents[i].Y - 10, 20, 20);
        } else if (Agents[i].Type == 2) {
            Agent.drawImage(Rock, Agents[i].X - 10, Agents[i].Y - 10, 20, 20);
        }
    }
}

function End () {
    var Text = Canvas.getContext("2d");
    Text.textAlign = "center";
    Text.font = Canvas.width/10 + "px sans-serif"
    if (Agents[0].Type == 0) {
        Text.fillText("Paper Won", Canvas.width/2, Canvas.height/2);
    } else if (Agents[0].Type == 1) {
        Text.fillText("Scissor Won", Canvas.width/2, Canvas.height/2);
    } else if (Agents[0].Type == 2) {
        Text.fillText("Rock Won", Canvas.width/2, Canvas.height/2);
    }
}