import express from "express";
const app = express()
const { exec } = require('child_process');


app.get("/build", (req, res) => {
    const { accessKey } = req.query;
    if (!accessKey) {
        return res.send("Failed to build key was not provided");
    }
    const { MATCH_ACCESS_KEY } = process.env;
    if (!MATCH_ACCESS_KEY) {
        return res.send("Failed to build match access key was not set");
    }
    if (accessKey === MATCH_ACCESS_KEY) {
        exec('docker exec build-image /bin/sh /app/build.sh', (error1, stdout1, stderr1) => {
            if (error1) {
                console.error(`exec error: ${error1}`);
                return;
            } else {
                exec('docker pull recrodeveloper/medulla-frontend:latest', (error2, stdout2, stderr2) => {
                    if (error2) {
                        console.error(`exec error: ${error2}`);
                        return;
                    } else {
                        exec('docker stop medulla', (error3, stdout3, stderr3) => {
                            if (error3) {
                                console.error(`exec error: ${error3}`);
                                return;
                            } else {
                                exec('docker run -d --rm -p 80:5000 --name=medulla recrodeveloper/medulla-frontend:latest', (error4, stdout4, stderr4) => {
                                    if (error4) {
                                        console.error(`exec error: ${error4}`);
                                        return;
                                    } else {

                                    }
                                    console.log(`stdout: ${stdout4}`);
                                    console.error(`stderr: ${stderr4}`);
                                });
                            }
                            console.log(`stdout: ${stdout3}`);
                            console.error(`stderr: ${stderr3}`);
                        });
                    }
                    console.log(`stdout: ${stdout2}`);
                    console.error(`stderr: ${stderr2}`);
                });
            }
            console.log(`stdout: ${stdout1}`);
            console.error(`stderr: ${stderr1}`);
        });
        res.send("Success")
    } else {
        res.send("Failed to build access key does not match")
    }
});

app.listen(5000);



