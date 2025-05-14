const express = require("express");

const router = express.Router();


router.get("/", (req, res, next) => {
  //   res.send("This will send all of the book data");
  res.status(200).json({
    success: { message: "This will send all of the book data" },
  });
});
router.get("/:id", (req, res, next) => {
  //   res.send("This will send a single book by its id");
  res.status(200).json({
    success: { message: "This will send a single book by its id" },
  });
});
router.post("/create/new", (req, res, next) => {
  //   res.send("This will create a new book");
  res.status(200).json({
    success: { message: "This will create a new book" },
  });
});
router.put("/update/:id", (req, res, next) => {
  //   res.send("This will update a book by its id");
  res.status(200).json({
    success: { message: "This will update a book by its id" },
  });
});
router.delete("/delete/:id", (req, res, next) => {
  //   res.send("This will delete a book by its id");
  res.status(200).json({
    success: { message: "This will delete a book by its id" },
  });
});

module.exports = router;