const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

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
        success: {message: "This route points to the Home page"}
    });
});
app.get("/api/books", (req, res, next) => {
  //   res.send("This will send all of the book data");
  res.status(200).json({
    success: {message: "This will send all of the book data"}
    });
});
app.get("/api/books/:id", (req, res, next) => {
  //   res.send("This will send a single book by its id");
  res.status(200).json({
    success: {message: "This will send a single book by its id"}
    });
});
app.get("/api/books/create/new", (req, res, next) => {
  //   res.send("This will create a new book");
  res.status(200).json({
    success: {message: "This will create a new book"}
    });
});
app.get("/api/books/update/:id", (req, res, next) => {
  //   res.send("This will update a book by its id");
  res.status(200).json({
    success: {message: "This will update a book by its id"}
    });
});
app.get("/api/books/delete/:id", (req, res, next) => {
  //   res.send("This will delete a book by its id");
  res.status(200).json({
    success: {message: "This will delete a book by its id"}
  });
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log(`Open in browser: http://localhost:${PORT}/`);
});
