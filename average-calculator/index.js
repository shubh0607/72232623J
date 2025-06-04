const express = require('express');
const dotenv = require('dotenv');
const fetchNumbers = require('./services/fetchNumber');
const { updateWindow } = require('./utils/windosManager');

dotenv.config();
const app = express();
const port = process.env.PORT || 9876;

const windowSize = 10;
let window = [];

app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    const allowedTypes = ['p', 'f', 'e', 'r'];

    if (!allowedTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid number ID type' });
    }

    try {
        const { numbers } = await fetchNumbers(type);
        const prevWindow = [...window];
        window = updateWindow(window, numbers, windowSize);

        const avg = (window.reduce((a, b) => a + b, 0) / window.length).toFixed(2);

        res.json({
            windowPrevState: prevWindow,
            windowCurrState: window,
            numbers,
            avg: parseFloat(avg)
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error or API timeout' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
