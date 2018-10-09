var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    proxy = require('express-http-proxy'),
    urlHelper = require('url'),
    bodyParser = require('body-parser');

http.globalAgent.maxSockets = 100000;

var app = express();

// all environments
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static(path.join(__dirname, '.')));

app.use('/action', proxy('qa.ekstep.in', {
    https: true,
    proxyReqPathResolver: function(req) {
        return "/api" + urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        // you can update headers 
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        //QA
        proxyReqOpts.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwNjM3ODhjMDFjMTg0OGEwOGJjNTRkNzZjYjFkNjQ0ZiIsImlhdCI6bnVsbCwiZXhwIjpudWxsLCJhdWQiOiIiLCJzdWIiOiIifQ.k-C981IZ7clwqDNtBNZ4vL_Iz0BN25MgCbyeZX89Lp0';

        //DEV
        // proxyReqOpts.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NWU2MTUxNzdkODY0MGJkYWNmMWE4MWEwM2Y5MmNjYSJ9.yST4a-kA0K-r-86m0gx45IMTTZP0ujQnjFDEjv2wU0A';
        
        return proxyReqOpts;
    }
}));

var routes = __dirname + '/server/routes', route_files = fs.readdirSync(routes);
route_files.forEach(function (file) {
    require(routes + '/' + file)(app, __dirname);
});

var server = http.createServer(app).listen(app.get('port'), 1500);
server.timeout = 0;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';