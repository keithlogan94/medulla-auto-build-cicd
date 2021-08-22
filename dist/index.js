"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.get("/build", function (req, res) {
  var accessKey = req.query.accessKey;

  if (!accessKey) {
    return res.send("Failed to build key was not provided");
  }

  var MATCH_ACCESS_KEY = process.env.MATCH_ACCESS_KEY;

  if (!MATCH_ACCESS_KEY) {
    return res.send("Failed to build match access key was not set");
  }

  if (accessKey === MATCH_ACCESS_KEY) {
    res.send("Success");
  } else {
    res.send("Failed to build access key does not match");
  }
});
app.listen(5000);