"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUnverifiedUsers = exports.getVerifiedUsers = exports.getAllUsers = exports.filterUsers = exports.getUser = exports.verify = void 0;

var _model = require("../model");

var verify = function verify(email) {
  if (!email) throw new Error('Email is undefined');
  return _model.User.update({
    status: 'verified'
  }, {
    email: email
  }).data[0];
};

exports.verify = verify;

var getUser = function getUser(email) {
  if (!email) throw new Error('Email is undefined');
  return _model.User.find({
    email: email
  }).data[0];
};

exports.getUser = getUser;

var filterUsers = function filterUsers(_ref) {
  var status = _ref.status;
  return _model.User.find({
    status: status
  }).data;
};

exports.filterUsers = filterUsers;

var getAllUsers = function getAllUsers() {
  return _model.User.findAll().data;
};

exports.getAllUsers = getAllUsers;

var getVerifiedUsers = function getVerifiedUsers() {
  return _model.User.find({
    status: 'verified'
  }).data;
};

exports.getVerifiedUsers = getVerifiedUsers;

var getUnverifiedUsers = function getUnverifiedUsers() {
  return _model.User.find({
    status: 'unverified'
  }).data;
};

exports.getUnverifiedUsers = getUnverifiedUsers;