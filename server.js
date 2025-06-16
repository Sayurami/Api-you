const express = require('express');
const cors = require('cors');
const { getJilhubVideoInfo } = require('./index');

const app = express();
app.use(cors());

app.get('/api/jilhub', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const videoInfo = await getJilhubVideoInfo(url);
        res.json(videoInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video info', details: error.message });
    }
});

module.exports = app;
