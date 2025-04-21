const numCPUs = require("os").cpus().length;
const express = require("express");
const http = require("http");
const cluster = require("cluster");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
require("dotenv").config();

const uri = process.env.DATABASE_URL;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.ACCESS_TOKEN_SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: uri }),
    })
  );

  const studentRouter = require("./routes/students");
  const courseRouter = require("./routes/courses");
  const enrollmentRouter = require("./routes/enrollment");
  app.use("/student", studentRouter);
  app.use("/course", courseRouter);
  app.use("/enroll", enrollmentRouter);

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      process.exit(1);
    });

  const PORT = process.env.PORT || 1234;
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on http://localhost:${PORT}`);
  });
}
