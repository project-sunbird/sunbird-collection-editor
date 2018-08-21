var express = require('express')

var http = require('http')

var path = require('path')

var fs = require('fs')

var proxy = require('express-http-proxy')

var urlHelper = require('url')

var bodyParser = require('body-parser')

http.globalAgent.maxSockets = 100000

var app = express()

// all environments
app.set('port', 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static(path.join(__dirname, '.')))

app.use('/action', proxy('dev.ekstep.in', {
	https: true,
	proxyReqPathResolver: function (req) {
		return '/api' + urlHelper.parse(req.url).path
	},
	proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
		// you can update headers
		proxyReqOpts.headers['Content-Type'] = 'application/json'
		proxyReqOpts.headers['user-id'] = 'content-editor'
		proxyReqOpts.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NWU2MTUxNzdkODY0MGJkYWNmMWE4MWEwM2Y5MmNjYSJ9.yST4a-kA0K-r-86m0gx45IMTTZP0ujQnjFDEjv2wU0A'
		return proxyReqOpts
	}
}))
// eslint-disable-next-line
var routes = __dirname + '/server/routes'; var route_files = fs.readdirSync(routes)
route_files.forEach(function (file) {
	require(routes + '/' + file)(app, __dirname)
})

var server = http.createServer(app).listen(app.get('port'), 1500)
server.timeout = 0
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
