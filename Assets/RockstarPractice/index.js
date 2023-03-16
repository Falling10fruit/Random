var Canvas = document.getElementById("Canvas");
var ctx = Canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
var Player = {
    X: 0,
    Y: 0,
    XVel: 0,
    YVel: 0,
    Player: 0,
    Gun: 0,
};
var Player0 = Gun0 = new Image();
var Coordinates = document.getElementById("Coordinates");
var Scene = "Loading";
var Loaded = 0;

Canvas.width = Canvas.height = window.innerWidth/2;
Player.X = Canvas.width/2;
Player.Y = Canvas.height/2;
Player0.src = "Assets/Player0.png";
Gun0.src = "Assets/Gun0.png";

for (var i = 0; i < 1000; i++) {
    if (i == 688) {
        document.getElementById("Coordinates").innerHTML += "<span id='Rickroll'>Wacky </span>";
        document.getElementById("Rickroll").addEventListener("click", function () {
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

Player0.onload = function () {
    Loaded++;
    Gun0.onload = function () {
        Loaded++;
        Tick();
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
    ctx.fillText("Loaded Assets: "  + Loaded + "/2", Canvas.width/2, Canvas.height/5*3);

    if (Scene == "Loading") {
        window.requestAnimationFrame(Loading);
    } 
}

function Tick () {
    
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, Canvas.width, Canvas.height);

    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 87) {
            Player.YVel = 1/FPS;
        }

        if (e.keyCode === 65) {
            Player.XVel = 1/FPS;
        }
        
        if (e.keyCode === 83) {
            Player.YVel = 1/FPS;
        }

        if (e.keyCode === 68) {
            Player.XVel = 1/FPS;
        }
    });
    
    Player.X += Player.XVel;
    Player.Y += Player.YVel;

    Player.XVel = Player.XVel * 0.9;
    Player.YVel = Player.YVel * 0.9;

    if (Math.abs(Player.X - Canvas.width/2) > Canvas.width) {
        Player.X = Math.abs(Player.X)/Player.X * Canvas.width/2 + Canvas.width/2;
    }

    Canvas.addEventListener("mousemove", function(e) {
        mouseX = e.clientX - Canvas.getBoundingClientRect().x - 3;
        mouseY = e.clientY - Canvas.getBoundingClientRect().y - 3;
    });

    Coordinates.innerHTML = "FPS: " + FPS + "<br>X: " + Player.X + " | Y: " + Player.Y + " | XVel: " + Player.XVel + " | YVel: " + Player.YVel + "<br>MouseX: " + mouseX + " | MouseY: " + mouseY;

    Canvas.style.cursor = "none";

    // CrossHair
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(mouseX - 2, mouseY - 15, 4, 30);
    ctx.fillRect(mouseX - 15, mouseY - 2, 30, 4);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(Player.X - 10, Player.Y - 10, 20, 20);

    Img.src = Player.Img;

    Img.onload = function () {
        ctx.drawImage(Img, Player.X - 15, Player.Y - 15, 30, 30);
    }



    window.requestAnimationFrame(Tick);
}