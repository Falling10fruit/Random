var Canvas = document.getElementById("Canvas");
var ctx = Canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
var Entities = [{
    Type: "Player",
    Width: 20,
    Height: 20,
    X: 0,
    Y: 0,
    XVel: 0,
    YVel: 0,
    Skin: 0,
    Gun: 0,
}, {
    Type: "B0",
    X0: 100,
    Y0: 100,
    X1: 200,
    Y1: 300,
    XVel: 100,
    YVel: 200
}, {
    Type: "E0",
    Width: 20,
    Height: 20,
    X: 200,
    Y: 200,
    XVel: 0,
    YVel: 0,
    AnimDelay: 1
}];
var Skin0 = new Image();
var Gun0 = new Image();
var E00 = new Image();
var E01 = new Image();
var E02 = new Image();
var E03 = new Image();
var Coordinates = document.getElementById("Coordinates");
var Scene = "Loading";
var Loaded = 0;
var FPS = 60;
var Counter = 0;
var Tick = 0;

Canvas.width = Canvas.height = window.innerWidth/2;
ctx.imageSmoothingEnabled = false;
ctx.imageRendering = 'pixelated';
Entities[0].X = Canvas.width/2;
Entities[0].Y = Canvas.height/2;
Skin0.src = "Assets/Skin0.png";
Gun0.src = "Assets/Gun0.png";
E00.src = "Assets/E00.png";
E01.src = "Assets/E01.png";
E02.src = "Assets/E02.png";
E03.src = "Assets/E03.png";

for (var i = 0; i < 1000; i++) {
    if (i == 688) {
        document.getElementById("Coordinates").innerHTML += "<span id='Rickroll'>Wacky </span>";
        document.getElementById("Rickroll").addEventListener("click", function (e) {
            console.log("Clicked");
            location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        });
    } else {
        let Rando = Math.floor(Math.random()*5);
            
        if (Rando == 0) {
            document.getElementById("Coordinates").innerHTML += "Bonji ";
        } else if (Rando == 1) {
            document.getElementById("Coordinates").innerHTML += "Banji ";
        } else if (Rando == 2) {
            document.getElementById("Coordinates").innerHTML += "Bunky ";
        } else if (Rando == 3) {
            document.getElementById("Coordinates").innerHTML += "Backie ";
        } else if (Rando == 4) {
            document.getElementById("Coordinates").innerHTML += "Cracky ";
        }
    }
}

document.getElementById("Coordinates").innerHTML = "<a href='#'>" + document.getElementById("Coordinates").innerHTML + "</a>";

Loading();

Skin0.onload = function () {
    Loaded++;
    Gun0.onload = function () {
        Loaded++;
        E00.onload = function () {
            Loaded++;
            E01.onload = function () {
                Loaded++;
                E02.onload = function () {
                    Loaded++;
                    E03.onload = function () {
                        Loaded++;
                        Scene = "Play";
                        Refresh();
                    }
                }
            }
        }
    }
}

function Loading () {
    let Timer = new Date().getTime();
    let Text = "Loading";

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    
    for (var i = 0; i < Math.floor(Timer/500)%4; i++) {
        Text += ".";
    }

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.textAlign = "center";
    ctx.font = Canvas.width/10 + "px sans-serif";
    ctx.fillText(Text, Canvas.width/2, Canvas.height/2);
    ctx.font = Canvas.width/20 + "px sans-serif";
    ctx.fillText("Loaded Assets: "  + Loaded + "/6", Canvas.width/2, Canvas.height/5*3);

    if (Scene == "Loading") {
        window.requestAnimationFrame(Loading);
    } 
}

function Refresh () {
    Counter++;

    for (var i = 0; i < Entities.length; i++) {
        if (Entities[i].Type == "Player") {

            // Player move
            window.addEventListener("keydown", function (e) {
                if (e.keyCode === 87) {
                    Entities[i].YVel = -1000/FPS;
                }

                if (e.keyCode === 65) {
                    Entities[i].XVel = -1000/FPS;
                }
                
                if (e.keyCode === 83) {
                    Entities[i].YVel = 1000/FPS;
                }

                if (e.keyCode === 68) {
                    Entities[i].XVel = 1000/FPS;
                }
            });
            
            Entities[i].X += Entities[i].XVel;
            Entities[i].Y += Entities[i].YVel;

            Entities[i].XVel = Entities[i].XVel * 0.9;
            Entities[i].YVel = Entities[i].YVel * 0.9;

            Entities[i].X = Math.min(Math.max(Entities[i].X, 10), Canvas.width - 10);
            Entities[i].Y = Math.min(Math.max(Entities[i].Y, 10), Canvas.height - 10);
        } else if (Entities[i].Type.charAt(0) == "B") {
            for (var x = 0; Entities[x].Type == "Player"; x++) {
                let PlayerIndex = x;
            }

            if (Entities[i].Type.charAt(1) == "1") { // Pistol
                Entities[i].X0 = Entities[i].X1;
                Entities[i].Y0 = Entities[i].Y1;
                Entities[i].X1 += Entities[i].XVel;
                Entities[i].Y1 += Entities[i].YVel;

                for (var x = 0; x < Math.abs(Entities[i].XVel); x++) {
                    Entities[i].XVel += Entities
                }
            }
        }
    }

    // Mouse update
    Canvas.addEventListener("mousemove", function(e) {
        mouseX = e.clientX - Canvas.getBoundingClientRect().x - 3;
        mouseY = e.clientY - Canvas.getBoundingClientRect().y - 3;
    });

    //

    Coordinates.innerHTML = "FPS: " + FPS + "<br>X: " + Entities[0].X + " | Y: " + Entities[0].Y + " | XVel: " + Entities[0].XVel + " | YVel: " + Entities[0].YVel + "<br>MouseX: " + mouseX + " | MouseY: " + mouseY;

    Canvas.style.cursor = "none";

    Refresh();

    window.requestAnimationFrame(Tick);
}

function Render () {
    // Background
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);
    
    // CrossHair
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(mouseX - 2, mouseY - 15, 4, 30);
    ctx.fillRect(mouseX - 15, mouseY - 2, 30, 4);

    for (var i = 0; i < Entities.length; i++) {
        if (Entities[i].Type == "Player") {
            // Player
            if (mouseX - Entities[i].X < 0) {
                ctx.save();
                ctx.translate(Entities[i].X, Entities[i].Y);
                ctx.scale(-1, 1);
                ctx.drawImage(Skin0, -10, -10, 20, 20);
            } else {
                ctx.drawImage(Skin0, Entities[i].X - 10, Entities[i].Y - 10, 20, 20);
            }
            ctx.restore();
        } else if (Entities[i].Type.charAt(0) == "B") { // Pistols
            ctx.beginPath();
            ctx.moveTo(Entities[i].X0, Entities[i].Y0);
            ctx.lineTo(Entities[i].X1, Entities[i].Y1);
            ctx.stroke();
        }
    }


    // Gun
    let mouseXDist = mouseX - Entities[0].X;
    let mouseYDist = mouseY - Entities[0].Y;

    ctx.save();
    ctx.translate(Entities[0].X, Entities[0].Y);

    if (mouseXDist > 0) {
        if (mouseYDist > 0) {
            ctx.rotate(-Math.atan(mouseXDist/mouseYDist) + 90 * Math.PI / 180);
        } else {
            ctx.rotate(Math.atan(mouseYDist/mouseXDist));
        }
    } else {
        ctx.scale(-1, 1);

        if (mouseYDist > 0) {
            ctx.rotate(Math.atan(mouseXDist/mouseYDist) + 90 * Math.PI / 180);
        } else {
            ctx.rotate(-Math.atan(mouseYDist/mouseXDist));
        }
    }

    ctx.drawImage(Gun0, 10, -5, 10, 10);
    ctx.restore();
}

setInterval(function () {FPS = Counter; Counter = 0}, 1000);

setInterval(function () {Tick++}, 125);