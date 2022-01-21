const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

const publicVapidKey = "BKj-zi017_tZXuK7ViTUEwTYccGGitdTj7n8fCeUDS6azkGIzsCS33ZBYYcfDp8WRupGhD9bJhCjX2E528BImHQ";
const privateVapidKey = "lWySODv1CEZJVfLHNs8CFDijIWMCMOb20A9OOO-WJv0";

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    res.status(201).json({});

    const payload = JSON.stringify({ title: "Push Test" });

    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
})

app.listen(8080, () => console.log('listerning on port 8080'))
