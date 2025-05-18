const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 8080;

// middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// path
app.get("/", (req, res, next) => {
  //   res.send("This route points to the Home page");
  res.status(200).json({
    success: { message: "This route points to the Home page" },
  });
});

app.use("/api/books", bookRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}/`);
});
