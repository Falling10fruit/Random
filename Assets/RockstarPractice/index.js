var Canvas = document.getElementById("Canvas");
var ctx = Canvas.getContext("2d");
var Coordinates = document.getElementById("Coordinates");
var Scene = "Loading";
var Loaded = 0;
var FPS = 60;
var Counter = 0;
var Tick = 0;
var mouseX = 0;
var mouseY = 0;
var Entities = [{
    Type: "Player",
    Width: 20,
    Height: 20,
    Health: 10,
    X: Canvas.width/2,
    Y: Canvas.height/2,
    XVel: 0,
    YVel: 0,
    Skin: 0,
    Gun: 0,
}, {
    Type: "Bullet0",
    X0: 100,
    Y0: 100,
    X1: 200,
    Y1: 300,
    XVel: 10,
    YVel: 0
}, {
    Type: "Enemy0",
    Width: 20,
    Height: 20,
    Health: 5,
    X: Canvas.width/2 - 100,
    Y: Canvas.height/2,
    XVel: 0,
    YVel: 0,
    AnimDelay: 1
}];
var Skin0 = new Image();
var Gun0 = new Image();
var Enemy00 = new Image();
var Enemy01 = new Image();
var Enemy02 = new Image();
var Enemy03 = new Image();
var Touching = function (i, x) { // Simplify
    return Math.abs(Entities[x].X - Entities[i].X) < Entities[x].Width/2 + Entities[i].Width/2 && Math.abs(Entities[x].Y - Entities[i].Y) < Entities[x].Height/2 + Entities[i].Height/2;
}
var DealCollisions = function () {

}

Canvas.width = Canvas.height = window.innerWidth/2;
ctx.imageSmoothingEnabled = false;
ctx.imageRendering = 'pixelated';
Skin0.src = "Assets/Skin0.png";
Gun0.src = "Assets/Gun0.png";
Enemy00.src = "Assets/E00.png";
Enemy01.src = "Assets/E01.png";
Enemy02.src = "Assets/E02.png";
Enemy03.src = "Assets/E03.png";

for (var i = 0; i < 1000; i++) {
    if (i == 688) {
        document.getElementById("Coordinates").innerHTML += "<span id='Rickroll'>Wacky </span>";
        document.getElementById("Rickroll").addEventListener("click", function (e) {
            e.preventDefault();
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
        Enemy00.onload = function () {
            Loaded++;
            Enemy01.onload = function () {
                Loaded++;
                Enemy02.onload = function () {
                    Loaded++;
                    Enemy03.onload = function () {
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
    
    window.addEventListener("keydown", function (e) {
        for (var i = 0; i < Entities.length; i++) {
            if (Entities[i].Type == "Player") {
                if (e.keyCode === 87) {
                    Entities[i].YVel = -500/FPS;
                }

                if (e.keyCode === 65) {
                    Entities[i].XVel = -500/FPS;
                }
                
                if (e.keyCode === 83) {
                    Entities[i].YVel = 500/FPS;
                }

                if (e.keyCode === 68) {
                    Entities[i].XVel = 500/FPS;
                }

                i = Entities.length;
            }
        }
    });

    for (var i = 0; i < Entities.length; i++) {
        if (Entities[i].Type == "Player") {
            // Player move
            Entities[i].X += Entities[i].XVel;
            Entities[i].Y += Entities[i].YVel;

            Entities[i].XVel = Entities[i].XVel * 0.9;
            Entities[i].YVel = Entities[i].YVel * 0.9;

            // Player collide with other entity
            for (var x = 0; x < Entities.length; x++) {
                if (Entities[x].Type.charAt(0) != "B" && Entities[x].Type != "Player") { // Bullets have no width or height, bullet collision will be dealt in the bullet sccript
                    if (Touching(i, x)) {
                        while (Touching(i, x)) {
                            Entities[i].X -= Math.sign(Entities[i].XVel);
                            Entities[i].Y -= Math.sign(Entities[i].YVel);
                        }

                        Entities[i].XVel = Entities[i].YVel = 0;
                    }
                }
            }

            // Player collide with edge
            Entities[i].X = Math.min(Math.max(Entities[i].X, 10), Canvas.width - 10);
            Entities[i].Y = Math.min(Math.max(Entities[i].Y, 10), Canvas.height - 10);
        } else if (Entities[i].Type.charAt(0) == "B") {
            if (Entities[i].XVel == 0) {
                Entities.splice(i, 1);
            } else if (Entities[i].Type.charAt(1) == "1") { // Pistol
                Entities[i].X0 = Entities[i].X1;
                Entities[i].Y0 = Entities[i].Y1;
                Entities[i].X1 += Entities[i].XVel;
                Entities[i].Y1 += Entities[i].YVel;

                for (var x = 0; x < Math.abs(Entities[i].XVel); x++) {
                    Entities[i].X1 += 1;
                    Entities[i].Y1 += Entities[i].YVel/Entities[i].XVel;

                    for (var y = 0; y < Entities.length; y++) {
                        if (Entities[y].Type.charAt(0) != "B") {
                            if (Math.abs(Entities[y].X - Entities[i].X1) < Entities[x].Width/2) {
                                if (Math.abs(Entities[y].Y - Entities[i].Y1) < Entities[i].Height/2) {
                                    Entities[y].Health -= 1;

                                    Entities[i].XVel = Entities[i].YVel = 0;

                                    x = y = Entities.length;
                                }
                            } 
                        }
                    }
                }
            }
        } else if (Entities[i].Type.charAt(0) == "E") {

            Entities[i].X += Entities[i].XVel;
            Entities[i].Y += Entities[i].YVel;

            for (var x = 0; x < Entities.length; x++) {
                if (Entities[x].Type == "Player") {
                    var PID = x;
                    x = Entities.length;
                }
            }

            if (Entities[i].Type.charAt(1) == "0") {
                let XDist = Entities[PID].X - Entities[i].X;
                let YDist = Entities[PID].Y - Entities[i].Y;
                let Angle = Math.atan(YDist/XDist)*180/Math.PI;

                if (Math.sign(YDist) == 1) {
                    Entities[i].YVel = 1800/FPS * Math.sin(Angle)/Math.PI;
                } else {
                    Entities[i].YVel = -1800/FPS * Math.sin(Angle)/Math.PI;
                }

                if (Math.sign(XDist) == 1) {
                    Entities[i].XVel = 1800/FPS * Math.cos(Angle)/Math.PI;
                } else {
                    Entities[i].XVel = -1000/FPS * Math.cos(Angle)/Math.PI;
                }

                console.log("XDist: " + XDist + " YDist: " + YDist + " Angle: " + Angle + " XVel: " + Entities[i].XVel + " YVel: " + Entities[i].YVel);
            }

            for (var x = 0; x < Entities.length; x++) {
                if (Entities[x].Type.charAt(0) != "B" && x != i) {
                    if (Touching(i, x)) {
                        while (Touching(i, x)) {
                            Entities[i].X -= Math.sign(Entities[i].XVel);
                            Entities[i].Y -= Math.sign(Entities[i].YVel);
                        }

                        Entities[i].XVel = Entities[i].YVel = 0;
                    }
                }
            }

            
            Entities[i].X = Math.min(Math.max(Entities[i].X, 10), Canvas.width - Entities[i].Width/2);
            Entities[i].Y = Math.min(Math.max(Entities[i].Y, 10), Canvas.height - Entities[i].Height/2);
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

    Render();

    window.requestAnimationFrame(Refresh);
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
        } else if (Entities[i].Type.charAt(0) == "E") {
            if (Entities[i].Type.charAt(1) == "0") {
                ctx.fillStyle = "rgb(0, 255, 100)";
                ctx.fillRect(Entities[i].X - Entities[i].Width/2, Entities[i].Y - Entities[i].Height/2, Entities[i].Width, Entities[i].Width);
            }
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