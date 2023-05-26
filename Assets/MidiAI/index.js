var http = require("http");
var fs = require("fs");
var midiParser = require("midi-parser-js");
var Students = [/*Brain: [ Layer: [ Nodes: [Connections(Acts like weight): [], Storage: ]]]*/];
var Answers = [
    [ // Example 0
        "0010",//         _         _     _ _ _ _ _     _             _             _ _ _ _ _
        "0000",//       /  /      /  /  /   _ _ _ /   /  /          /  /          /   _ _    /
        "0001",//      /  /      /  /  /  /          /  /          /  /          /  /    /  /
        "0000",//     /  /_ _ _ /  /  /  /_ _ _     /  /          /  /          /  /    /  /
        "0000",//    /   _ _ _    /  /   _ _ _ /   /  /          /  /          /  /    /  /
        "0010",//   /  /      /  /  /  /          /  /          /  /          /  /    /  /
        "0001",//  /  /      /  /  /  /_ _ _ _   /  /_ _ _ _   /  /_ _ _ _   /  /_ _ /  /
        "0000",// /_ /      /_ /  /_ _ _ _ _ /  /_ _ _ _ _ /  /_ _ _ _ _ /  /_ _ _ _ _ /
        "0100",//
        "0000",//                _ _ _ _ _     _ _ _ _ _     _        _
        "0010",//              /_ _ _ _   /  /   _ _    /  /  |     /  /
        "0000",//                     /  /  /  /    /  /  /   |    /  /
        "0000",//                    /  /  /  /    /  /  /  /||   /  /
        "0100",//                   /  /  /  /    /  /  /  / ||  /  /
        "0010",//                  /  /  /  /    /  /  /  /  || /  /  
        "0000",//                 -  /  /  /    /  /  /  /   ||/  /
        "1000",//         _ _ _ -  -   /  /_ _ /  /  /  /    |   / 
        "0000",//       /_ _ _ _ -    /_ _ _ _ _ /  /_ /     |_ /
        "0100",
        "0000",
        "0000",
        "1000",
        "0100",
        "0000",
        "0001",
        "0001",
        "0000",
        "0100"
    ], [
        "1000",
        "0000",
        "0000",
        "0100",
        "0010",
        "0000",
        "0001",
        "0000",
        "0010",
        "0001",
        "0000",
        "0010",
        "0100",
        "0000",
        "0010",
        "0000",
        "0001",
        "0010",
        "0001",
        "0000",
        "0010",
        "0000",
        "0100",
        "0000",
        "1000",
        "0000",
        "0100",
        "1000",
        "0000",
        "0000",
        "0000",
        "0000",
        "0000"
    ]
];
var InputElement = document.getElementById("Input");

//Generating brains
for (var i = 0; i < 20; i++) { // 20 brains
    Students.push([]);

    for (var x = 0; x < 11; x++) { // 10 hidden layers +  output layer
        Students[i].push([]);

        if (x < 11) {
            for (var y = 0; y < 100; y++) { // Neurons for hidden layers
                Students[i][x].push([]);
                
                if (x == 0) { // Connections to the input: [Current notes, notes before, notes after, notes at start, notes at last]
                    for (var z = 0; z < 105; z++) {
                        Students[i][x][y].push(Math.random() * 2 * (Math.floor(Math.random()*2)*2 - 1));
                    }
                } else {
                    for (var z = 0; z < 100; z++) { // Connections
                        Students[i][x][y].push(Math.random() * 2 * (Math.floor(Math.random()*2)*2 - 1));
                    }
                }
            }
        } else {
            for (var y = 0; y < 4; y++) { // Neurons for output layer
                for (z = 0; z < 100; z++) {
                    Students[i][x][y].push(Math.random() * 2 * (Math.floor(Math.random()*2)*2 - 1));
                }
            }
        }
    }
}

// Running Brains
function Run (Input /* Array */) {

}

//Training
for (var index = 0; index < Answers.length; index++) {
    fs.readFile("Example" + index + ".mid", "base64", function(Error, Data) {
        if (Error) throw Error;
    
        var Exam = midiParser.parse(Data);
    });
}

//Website
http.createServer(function(req, res) {
    fs.readFile("index.html", function(Error, Data) {
        if (Error) throw Error;

        res.writeHead(200, {"Content-Type": "text/html"});

        res.write(Data);
    })
}).listen(5000);

function Convert (Midi) {
    fs.readFile("Input.mid", "fileInput element", function(err, data) {
    });
};