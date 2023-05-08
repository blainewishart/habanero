const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const cheerio = require('cheerio');
const turndown = require('turndown');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/convert', async (req, res) => {
    try {
        const url = req.body.url;
        const html = await request(url);
        const $ = cheerio.load(html);
        const turndownService = new turndown();
        const markdown = turndownService.turndown($.html());
        res.status(200).send(markdown);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
