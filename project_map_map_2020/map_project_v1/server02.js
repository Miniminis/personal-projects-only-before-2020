var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var url = req.url;
    var method = req.method;
    console.log('요청 : ' + url + " : "+ method + " : "+ req);
    res.writeHead(200);
    if (url == '/') {
        url = '/index.html';
    }
    if (url == '/favicon.ico') {
        return res.writeHead(404);
    }
    if (url == '/post') {
        url = '/index.html';
        req.on('data', chunk => {
            console.log(chunk.toString());
        });    
        res.write('전송성공')
    }
    res.end(fs.readFileSync(__dirname + url));
});

server.listen(3000, function () {
    console.log('서버가 시작되었습니다. ');
})