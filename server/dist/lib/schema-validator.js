"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldTypes = exports.Validator = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A validator class to check if a data conform to the defined schema
 */
var Validator =
/*#__PURE__*/
function () {
  function Validator(schema) {
    _classCallCheck(this, Validator);

    this.schema = schema;
  }

  _createClass(Validator, [{
    key: "validate",
    value: function validate() {
      var _this = this;

      var entryToValidate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (entryToValidate instanceof Array) return this.validateArrayOfData(entryToValidate);
      return !Object.entries(entryToValidate).some(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            field = _ref2[0],
            value = _ref2[1];

        return !(typeof _this.schema[field] === 'function' && _this.schema[field](value));
      });
    }
  }, {
    key: "validateArrayOfData",
    value: function validateArrayOfData(entryToValidate) {
      var _this2 = this;

      return !entryToValidate.some(function (field) {
        return !_this2.validate(field);
      });
    }
  }]);

  return Validator;
}();
/** Defines major types and their validation functions */


exports.Validator = Validator;
var FieldTypes = {
  Integer: function Integer(field) {
    return typeof field === 'number' && field % 1 === 0;
  },
  String: function String(field) {
    return typeof field === 'string';
  },
  Boolean: function Boolean(field) {
    return typeof field === 'boolean' || field === 'true' || field === 'false';
  },
  Number: function Number(field) {
    return typeof field === 'number';
  },
  Date: function (_Date) {
    function Date(_x) {
      return _Date.apply(this, arguments);
    }

    Date.toString = function () {
      return _Date.toString();
    };

    return Date;
  }(function (field) {
    return field instanceof Date;
  })
}; // export default {
//   Validator,
//   FieldTypes,
// };

exports.FieldTypes = FieldTypes;