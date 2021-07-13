const config = require('./config.json');

const express = require("express");

const expressApp = express();
const api = require('./api.js');
const cors = require('cors');

function startListen(PORT, domain, bot) {
    const port = PORT || 3000;

    const secretPath = `/telegraf/${Math.random().toString(36).substring(7)}` //bot.secretPathComponent()

    // Set telegram webhook
    bot.telegram.setWebhook(`${domain}${secretPath}`, {
        drop_pending_updates: true,
    })

    // Set the bot API endpoint
    expressApp.use(bot.webhookCallback(secretPath))


    expressApp.get("/", (req, res) => { res.send(config.express_get_slash); });

    // for api with statistics (./api.js):
    if (config.api_enabled == true) {
    expressApp.use(cors())
        
        expressApp.get("/api/countManga", async (req, res) => {
            let answer = await api.countManga();
            res.send(answer);
        });
        expressApp.get("/api/countUsers", async (req, res) => {
            let answer = await api.countUsers();
            res.send(answer);
        });
        expressApp.get("/api/countMessages", async (req, res) => {
            let answer = await api.countMessages();
            res.send(answer);
        });
        expressApp.get("/api/messagesToday", async (req, res) => {
            let answer = await api.messagesToday();
            res.send(answer);
        });
        expressApp.get("/api/mangaToday", async (req, res) => {
            let answer = await api.mangaToday();
            res.send(answer);
        });
        expressApp.get("/api/usersToday", async (req, res) => {
            let answer = await api.usersToday();
            res.send(answer);
        });
        expressApp.get("/api/lastManga", async (req, res) => {
            let answer = await api.lastManga();
            res.send(answer);
        });
        expressApp.get("/api", async (req, res) => {
            let answer = await api.allinfo();
            res.send(answer);
        });
    }
    expressApp.listen(port, () => {
        console.log(`Bot is running on port ${port}`);
    });
}

module.exports = {
    startListen,
};