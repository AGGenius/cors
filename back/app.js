const express = require('express');
const cors = require('cors');
const app = express();
const characterRoutes = require('./routes/characters');

const port = 3000;

app.use(cors());
app.use('/', characterRoutes);

app.listen(port, () => {
    console.log(`Server active at port http://localhost:${port}`);
})