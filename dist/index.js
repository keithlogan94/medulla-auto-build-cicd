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
    exec('docker exec build-image /bin/sh /app/build.sh', function (error1, stdout1, stderr1) {
      if (error1) {
        console.error("exec error: ".concat(error1));
        return;
      } else {
        exec('docker pull recrodeveloper/medulla-frontend:latest', function (error2, stdout2, stderr2) {
          if (error2) {
            console.error("exec error: ".concat(error2));
            return;
          } else {
            exec('docker stop medulla', function (error3, stdout3, stderr3) {
              if (error3) {
                console.error("exec error: ".concat(error3));
                return;
              } else {
                exec('docker run -d --rm -p 80:5000 --name=medulla recrodeveloper/medulla-frontend:latest', function (error4, stdout4, stderr4) {
                  if (error4) {
                    console.error("exec error: ".concat(error4));
                    return;
                  } else {}

                  console.log("stdout: ".concat(stdout4));
                  console.error("stderr: ".concat(stderr4));
                });
              }

              console.log("stdout: ".concat(stdout3));
              console.error("stderr: ".concat(stderr3));
            });
          }

          console.log("stdout: ".concat(stdout2));
          console.error("stderr: ".concat(stderr2));
        });
      }

      console.log("stdout: ".concat(stdout1));
      console.error("stderr: ".concat(stderr1));
    });
    res.send("Success");
  } else {
    res.send("Failed to build access key does not match");
  }
});
app.listen(5000);