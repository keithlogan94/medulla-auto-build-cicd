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
        exec('./src/build.sh', (error2, stdout2, stderr2) => {
            if (error2) {
                console.error(`exec error: ${error2}`);
                return;
            } else {

            }
            console.log(`stdout: ${stdout2}`);
            console.error(`stderr: ${stderr2}`);
        });
        res.send("Success")
    } else {
        res.send("Failed to build access key does not match")
    }
});

app.listen(5000);



