
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const PORT = 3000;

app.use('/', apiRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
