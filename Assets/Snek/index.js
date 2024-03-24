// Get or set HighScore
if (window.localStorage.getItem("HighScore") === null) {
    window.localStorage.setItem("HighScore", 0);
}
var HighScore = window.localStorage.getItem("HighScore");

// Setting up boxes
for (var i = 0; i < 15; i++) {
    var tr = document.createElement("tr");
    document.getElementById("Grid").appendChild(tr);

    for (var x = 0; x < 15; x++) {
        var td = document.createElement("td");
        td.className = "Box";
        tr.appendChild(td);
        // console.log("Box created");
    }
}

//Styling boxes
var Boxes = document.getElementsByClassName("Box");

if (window.innerHeight < window.innerWidth) {
    for (var i = 0; i < Boxes.length; i++) {
        Boxes[i].style.width = Boxes[i].style.height = window.innerWidth/50 + "px";
    }
} else {
    for (var i = 0; i < Boxes.length; i++) {
        Boxes[i].style.width = Boxes[i].style.height = window.innerWidth/50 + "px";
    }
}

/*
Going by the order of "Easiest to code theoretically"
0: Nothing
1: Snake's body
2: Snake head
3: Food
*/

var Scene = []; // Data about the grid

for (var i = 0; i < 15; i++) { // Create said data
    Scene.push([]);
    for (var x = 0; x < 15; x++) {
        Scene[Scene.length - 1].push(0);
    };
};

Scene[7][7] = 2; // Set the head to center

var TailLength = 0;
var Tails = [/*{ Example to stupid fat forgetful creator
    Row: 8,
    Column: 7
}*/];
var Direction = "w";
var CreateFood = function () {
    var i = Math.floor(Math.random() * Scene.length);
    var x = Math.floor(Math.random() * Scene[i].length);

    while (Scene[i][x] != 0) {
        i = Math.floor(Math.random() * Scene.length);
        x = Math.floor(Math.random() * Scene[i].length);
    }

    Scene[i][x] = 3;
};
CreateFood();
var HeadPic = document.createElement("img");
HeadPic.setAttribute("src", "Head.png");
HeadPic.style.position = "fixed";
HeadPic.style.imageRendering = "pixelated";
document.body.appendChild(HeadPic);

// console.log(Scene);

for (var i = 0; i < 15; i++) { // Coloring
    for (var x = 0; x < 15; x++) {
        if (Scene[i][x] == 0) {
            Boxes[i * 15 + x].style.backgroundColor = "white";
        } else if (Scene[i][x] == 1) {
            Boxes[i * 15 + x].style.backgroundColor = "rgb(91, 191, 76)";
        } else if (Scene[i][x] == 2) {
            Boxes[i * 15 + x].style.backgroundColor = "green";

            // Head Picture
            //console.log(Boxes[i * 15 + x].getBoundingClientRect());
            HeadPic.style.top = Boxes[i * 15  + x].getBoundingClientRect().top + (Boxes[i * 15 + x].offsetWidth - Boxes[i * 15 + x].clientWidth)/2 + "px";
            HeadPic.style.left = Boxes[i * 15 + x].getBoundingClientRect().left + (Boxes[i * 15 + x].offsetWidth - Boxes[i * 15 + x].clientWidth)/2 + "px";
            HeadPic.style.width = HeadPic.style.height = Boxes[i * 15 + x].clientWidth + "px";
            if (Direction == "a") {
                HeadPic.style.transform = "rotate(-90deg)";
            } else if (Direction == "s") {
                HeadPic.style.transform = "rotate(-180deg)";
            } else if (Direction == "d") {
                HeadPic.style.transform = "rotate(90deg)";
            }
            //console.log(HeadPic.getBoundingClientRect());
        } else if (Scene[i][x] == 3) {
            Boxes[i * 15 + x].style.backgroundColor = "red";
        }
    };
};

// Main part - Infinite loop
var Game = function () {
    // Replace button with score
    document.getElementById("Start").remove();
    var ScoreText = document.createElement("p");
    ScoreText.innerText = "Score: " + TailLength;
    document.getElementById("Content").appendChild(ScoreText);

    var Die = function () {
        clearInterval(Play);
        console.log(TailLength + " " + HighScore);
        
        // Set Highscore
        if (HighScore < TailLength) {
            window.localStorage.setItem("HighScore", TailLength);
            HighScore = TailLength;
        }

        // Replacing the text with restart button and score text
        ScoreText.remove();
        var RestartDiv = document.createElement("div");
        RestartDiv.style.display = "flex";
        RestartDiv.style.flexDirection = "row";
        RestartDiv.style.justifyContent = "space-around";
        RestartDiv.setAttribute("id", "Start"); // So that "document.getElementById("Start").remove();" (line 146) doesn't panic
        RestartDiv.style.width = document.getElementById("Grid").getBoundingClientRect().width + "px";
        
        var HiScoretxt = document.createElement("p");
        HiScoretxt.innerText = "Highscore: " + HighScore;

        var Restart = document.createElement("button");
        Restart.setAttribute("type", "button");
        Restart.innerText = "Restart";
        Restart.style.marginTop = "2%";
        Restart.addEventListener("click", Game);

        console.log(TailLength);
        
        ScoreText.innerText = "Your Score: " + TailLength;

        document.getElementById("Content").appendChild(RestartDiv);
        RestartDiv.appendChild(HiScoretxt);
        RestartDiv.appendChild(Restart);
        RestartDiv.appendChild(ScoreText);

        // Resetting the grid
        for (var i = 0; i < Scene.length; i++) {
            for (var x = 0; x < Scene[i].length; x++) {
                Scene[i][x] = 0;
                console.log("Box at Row " + i + ", Column " + x + " cleared");
            }
        }
        TailLength = 0;
        Tails.splice(0, Tails.length);
        Scene[Math.floor(Scene.length/2)][Math.floor(Scene[Math.floor(Scene.length/2)].length/2)] = 2;
        CreateFood();
    };
    
    var Play = setInterval(function () {
        window.addEventListener("keypress", function (e) { // Change direction
            if (!(e.key == "w" && Direction == "s" || e.key == "a" && Direction == "d" || e.key == "s" && Direction == "w" || e.key == "d" && Direction == "a")) {
                if (e.key == "w") {
                    Direction = "w";
                } else if (e.key == "a") {
                    Direction = "a";
                } else if (e.key == "s") {
                    Direction = "s";
                } else if (e.key == "d") {
                    Direction = "d";
                }
            }
        });

        for (var i = 0; i < Scene.length; i++) { // Move head and grow tail
            for (var x = 0; x < Scene[i].length; x++) {
                if (Scene[i][x] == 2) {
                    if (Direction == "w") { // Collisions in the direction
                        if (!(i == 0)) {
                            if (Scene[i - 1][x] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i - 1][x] == 1) {
                                Die();
                            }
                        } else {
                            if (Scene[Scene.length - 1][x] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[Scene.length - 1][x] == 1) {
                                Die();
                            }
                        }
                    } else if (Direction == "a") {
                        if (!(x == 0)) {
                            if (Scene[i][x - 1] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i][x - 1] == 1) {
                                Die();
                            }
                        } else {
                            if (Scene[i][Scene[i].length - 1] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i][Scene[i].length - 1] == 1) {
                                Die();
                            }
                        }
                    } else if (Direction == "s") {
                        if (!(i == Scene.length - 1)) {
                            if (Scene[i + 1][x] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i + 1][x] == 1) {
                                Die();
                            }
                        } else {
                            if (Scene[0][x] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[0][x] == 1) {
                                Die();
                            }
                        }
                    } else if (Direction == "d") {
                        if (!(x == Scene.length - 1)) {
                            if (Scene[i][x + 1] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i][x + 1] == 1) {
                                Die();
                            }
                        } else {
                            if (Scene[i][0] == 3) {
                                TailLength++;
                                CreateFood();
                            } else if (Scene[i][0] == 1) {
                                Die();
                            }
                        }
                    }

                    if (document.getElementById("Start") == null) {
                        if (Direction == "w") { // Move in that direction
                            if (!(i == 0)) { 
                                Scene[i - 1][x] = 2;
                            } else {
                                Scene[Scene.length - 1][x] = 2;
                            }
                        } else if (Direction == "a") {
                            if (!(x == 0)) { 
                                Scene[i][x - 1] = 2;
                            } else {
                                Scene[i][Scene[i].length - 1] = 2;
                            }
                        } else if (Direction == "s") {
                            if (!(i == Scene.length - 1)) { 
                                Scene[i + 1][x] = 2;
                            } else {
                                Scene[0][x] = 2;
                            }
                        } else if (Direction == "d") {
                            if (!(x == Scene.length - 1)) { 
                                Scene[i][x + 1] = 2;
                            } else {
                                Scene[i][0] = 2;
                            }
                        }

                        Scene[i][x] = 0; // Remove previous head

                        Tails.push({ // Create Tail
                            Row: i,
                            Column: x
                        });
                    }

                    // End loop
                    x = Scene[i].length;
                    i = Scene.length - 1;
                }
            }
        }

        if (document.getElementById("Start") == null) {
            if (Tails.length > TailLength) { // Destroy end of tail if too long
                //console.log("Too long " + Tails[0].Row + " " + Tails[0].Column);
                Scene[Tails[0].Row][Tails[0].Column] = 0; // Replace with white
                Tails.splice(0, 1);
            };

            for (var i = 0; i < Tails.length; i++) { // Draw tails
                Scene[Tails[i].Row][Tails[i].Column] = 1; // Paint square by Tail'sz coordinate
                //console.log("Tail");
            };

            ScoreText.innerText = "Score: " + TailLength;

            for (var i = 0; i < 15; i++) { // Coloring
                for (var x = 0; x < 15; x++) {
                    if (Scene[i][x] == 0) {
                        Boxes[i * 15 + x].style.backgroundColor = "white";
                    } else if (Scene[i][x] == 1) {
                        Boxes[i * 15 + x].style.backgroundColor = "rgb(91, 191, 76)";
                    } else if (Scene[i][x] == 2) {
                        Boxes[i * 15 + x].style.backgroundColor = "green";

                        // Head Picture
                        //console.log(Boxes[i * 15 + x].getBoundingClientRect());
                        HeadPic.style.top = Boxes[i * 15  + x].getBoundingClientRect().top + (Boxes[i * 15 + x].offsetWidth - Boxes[i * 15 + x].clientWidth)/2 + "px";
                        HeadPic.style.left = Boxes[i * 15 + x].getBoundingClientRect().left + (Boxes[i * 15 + x].offsetWidth - Boxes[i * 15 + x].clientWidth)/2 + "px";
                        HeadPic.style.width = HeadPic.style.height = Boxes[i * 15 + x].clientWidth + "px";
                        if (Direction == "w") {
                            HeadPic.style.transform = "rotate(0deg)";
                        } else if(Direction == "a") {
                            HeadPic.style.transform = "rotate(-90deg)";
                        } else if (Direction == "s") {
                            HeadPic.style.transform = "rotate(-180deg)";
                        } else if (Direction == "d") {
                            HeadPic.style.transform = "rotate(90deg)";
                        }
                        //console.log(HeadPic.getBoundingClientRect());
                    } else if (Scene[i][x] == 3) {
                        Boxes[i * 15 + x].style.backgroundColor = "red";
                    }
                };
            };
        }
    }, 250);
}

document.getElementById("Start").addEventListener("click", Game);
