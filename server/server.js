require('dotenv').config(); // MUST be first

const connectDB = require('./DB');
const app = require('./app');

const port = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
