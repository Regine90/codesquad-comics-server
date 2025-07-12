const Book = require("../models/bookModel");

// GET all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: { message: "Successfully retrieved all books." },
      data: { books },
    });
  } catch (error) {
    return next(error);
  }
};

// GET one book by ID
const getBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const book = await Book.findById(_id);
    if (!book) {
      throw new Error("Book not found");
    }

    return res.status(200).json({
      success: { message: "Book found!" },
      data: { book },
    });
  } catch (error) {
    return next(error);
  }
};

// POST create a new book
const createBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("One of the required fields is missing.");
    }

    const newBook = new Book({
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
      imageUrl,
    });

    await newBook.save();

    return res.status(201).json({
      success: { message: "Book created successfully!" },
      data: { newBook },
    });
  } catch (error) {
    return next(error);
  }
};

// PUT update a book
const updateBook = async (req, res, next) => {
  const { _id } = req.params;
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("One of the required fields is missing.");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      {
        $set: {
          title,
          author,
          publisher,
          genre,
          pages,
          rating,
          synopsis,
          imageUrl,
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      throw new Error("Book not found");
    }

    return res.status(201).json({
      success: { message: "Book updated successfully!" },
      data: { updatedBook },
    });
  } catch (error) {
    return next(error);
  }
};

// DELETE a book
const deleteBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required");
    }

    const deletedBook = await Book.findByIdAndDelete(_id);

    if (!deletedBook) {
      throw new Error("Book not found");
    }

    return res.status(200).json({
      success: { message: "Book deleted successfully!" },
      data: { _id },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
