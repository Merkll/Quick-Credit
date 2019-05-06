"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A generic http response for the application
 */
var _default = function _default(data) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

  _classCallCheck(this, _default);

  this.status = status;
  this.data = data;
};

exports["default"] = _default;
;