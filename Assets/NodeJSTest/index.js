var http = require("http");
var Date = require("./DateTimeModule");
var url = require("url");
const {mp3, ogg} = require("fart");
var up = require("upper-case");
var fs = require("fs");
var rs = fs.createReadStream("./Test.txt")
var Address = "https://localhost:8080/default.htm?year=2017&month=february";
var q = url.parse(Address, true);

console.log(q.hostname);
console.log(q.pathname);
console.log(q.search);

var qData = q.query;
console.log(qData.month);

rs.on("open", function () {
    console.log("SECURITY BREACH ON ./Test.txt");
});

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("The current time and date is: " + Date.myDateTime() + "<br>");
    res.write(req.url + "<br>");
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write(txt + "<br>");
    res.write(up.upperCase("amongus") + "<br>")
    res.end("Hello World!");
}).listen(8080);