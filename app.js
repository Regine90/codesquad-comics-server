require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

const session = require("express-session");
const passport = require("passport");

// middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ credentials: true, origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true when deploying with HTTPS
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// path
app.get("/", (req, res, next) => {
  //   res.send("This route points to the HAome page");
  res.status(200).json({
    success: { message: "This route points to the Home page" },
  });
});

app.use("/api/books", bookRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).json({
      error: { message: "Already have an account? Try logging in." },
      statusCode: 400,
    });
  }

  return res.status(500).json({
    error: { message: err.message || "Internal server error. Oh no!" },
    statusCode: 500,
  });
});


app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}/`);
});
