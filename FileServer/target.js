#! /usr/bin/env node
"use strict";

var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _http = _interopRequireDefault(require("http"));
var _httpRequestLogger = require("./utils/httpRequestLogger");
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//@ts-ignore

const expressApp = (0, _express.default)();
const port = normalizePort(process.env.PORT || '2999');
expressApp.use((0, _cors.default)()).use(_express.default.static(_path.default.join(__dirname, 'static'))).use(_express.default.json()).use(_express.default.urlencoded({
  extended: false
})).use((0, _cookieParser.default)()).use(_express.default.static(_path.default.join(__dirname, 'public')))
//@ts-ignore
.use((0, _httpRequestLogger.logger)(process.env.LOGGER_OPEN || process.env.NODE_ENV))

//404page
.use(function (req, res, next) {
  res.send('[PiTeamWriter-FileServer]: Not Found File');
}).set('port', port);
const server = _http.default.createServer(expressApp);
server.listen(port, () => {
  console.log(`[PiTeamWriter-FileServer] running at: http://127.0.0.1:${port}`);
});
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
