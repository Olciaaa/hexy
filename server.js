var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
var bodyParser = require("body-parser")
var levele = [];
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'))

app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/strona.html")) 
})
app.get("/hex", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: "+__dirname)
    res.sendFile(path.join(__dirname + "/static/hex.html")) 
})

app.post("/dane", function (req, res) {
    let level =JSON.parse(req.body.level)
    levele.push({size:req.body.size,level:level});
    console.log(levele);
    res.send("tralala")
})
app.post("/open", function (req, res) {
    res.send(levele[levele.length-1]);
    console.log("tralala")
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})
