const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));

db.sequelize.sync().then(() => {
  console.log("Synced DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
