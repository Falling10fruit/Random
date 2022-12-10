var http = require("http");
var fs = require("fs");
var url = require("url");

fs.open("Test2.txt", "w", function (err, file) {
    if (err) throw err;
    console.log("1 Saved!");
});

fs.writeFile("Test2.txt", "Hello World!", function (err) {
    if (err) throw err;
    console.log("2 Saved!")
});

/*fs.unlink("Test2.txt", function (err) {
    if (err) throw err;
    console.log("Test2.txt deleted");
}); Apparently deleting files are faster than overwriting then, alongside with node's ansynchronized procedures*/

fs.rename("Test2.txt", "Fart.txt", function (err) {
    if (err) throw err;
    console.log("3 Saved!")
})

fs.appendFile("Test.txt", "Hello World!", function (err) {
    if (err) throw err;
    console.log("4 Saved!");
});

http.createServer(function (req, res) {
    fs.readFile("Test.html", function(err, data) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        return res.end();
    });
}).listen(8080);

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var fileName = "." + q.pathname;

    fs.readFile(fileName, function (err, Data) {
        console.log(fileName);
        
        if (err) {
            res.writeHead(404, {"Content-Type": "text/html"});
            return res.end("404 Not Found");
        }

        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(Data);
        return res.end();
    });
}).listen(7070);