const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `\n----------------------------------\n   Server running on port ${PORT}\n----------------------------------\n`
  );
});
