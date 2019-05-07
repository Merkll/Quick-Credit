"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _debug = _interopRequireDefault(require("debug"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _quickCredit = _interopRequireDefault(require("../docs/quick-credit.json"));

var _api = _interopRequireDefault(require("./api"));

var _errorHandler = _interopRequireDefault(require("./middleware/error-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = (0, _debug["default"])('http');
var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use((0, _morgan["default"])(':method :url :status :response-time ms'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/api', _api["default"]);
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_quickCredit["default"]));
app.all('*', function (req, res) {
  res.status(404).json({
    status: 404,
    error: 'Resource not available'
  });
}); // default error handler

app.use(_errorHandler["default"]);

var _default = app.listen(port, function () {
  return debug("Server started on port ".concat(port));
});

exports["default"] = _default;