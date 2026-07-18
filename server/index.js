const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const postRoutes = require("./routes/postRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server is Running");
});

const basePort = Number(process.env.PORT) || 5000;

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.log(`Port ${port} is busy. Trying ${nextPort}...`);
      startServer(nextPort);
    } else {
      console.error(error);
      process.exit(1);
    }
  });
};

startServer(basePort);