const express = require('express');
const cors = require('cors');
const experienceRoutes = require('./routes/experiences');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/experiences', experienceRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});