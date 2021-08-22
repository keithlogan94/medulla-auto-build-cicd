"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var _require = require('child_process'),
    exec = _require.exec;

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
    exec('./src/build.sh', function (error2, stdout2, stderr2) {
      if (error2) {
        console.error("exec error: ".concat(error2));
        return;
      } else {}

      console.log("stdout: ".concat(stdout2));
      console.error("stderr: ".concat(stderr2));
    });
    res.send("Success");
  } else {
    res.send("Failed to build access key does not match");
  }
});
app.listen(5000);