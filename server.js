const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let subscription;

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

const publicVapidKey = "BKj-zi017_tZXuK7ViTUEwTYccGGitdTj7n8fCeUDS6azkGIzsCS33ZBYYcfDp8WRupGhD9bJhCjX2E528BImHQ";
const privateVapidKey = "lWySODv1CEZJVfLHNs8CFDijIWMCMOb20A9OOO-WJv0";

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.get("/", (req, res) => {
    res.status(200).json({ title: "node is up and running" })
})

app.post('/subscribe', (req, res) => {
    subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Test" });

    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
})
setTimeout(temp, 10000)
function temp() {
    const interval = setInterval(() => {
        if (subscription) {
            const payload = JSON.stringify({ title: new Date().toLocaleTimeString() });
            webPush.sendNotification(subscription, payload).catch(err => console.error(err));
        }
    }, 1000)

    setTimeout(() => { clearInterval(interval) }, 3000)
}


app.listen(process.env.PORT || 8000, () => console.log('listerning on port 8080'))
