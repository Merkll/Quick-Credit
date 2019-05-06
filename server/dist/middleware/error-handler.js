"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(err, req, res, next) {
  if (err.status) res.status(err.status).send(err);else res.status(500).send(err);
  next(err);
};

exports["default"] = _default;