const booksData = require("../data/books");

const getAllBooks = async (req, res, next) => {
  try {
    const books = booksData;
    return res.status(200).json({
      success: {
        message: "This will lead to all the book pages in the books file.",
      },
      data: { books },
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        message:
          "The information being requested could not be found. Please try again!",
      },
    });
  }
};

const getBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const book = booksData.find((book) => book._id === _id);
    return res.status(200).json({
      success: { message: "Successful to continue!" },
      data: { book },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Errorrr. Try again!" },
    });
  }
};

const createBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;

  try {
    const newBook = {
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
      imageUrl,
    };

    return res.status(201).json({
      success: { message: "Sucessful!" },
      data: { newBook },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Failed. Try again!" },
    });
  }
};

const updateBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;
  const { _id } = req.params;

  try {
    const updatedBook = {
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
      imageUrl,
    };

    return res.status(201).json({
      success: { message: "Yayyy!!" },
      data: { updatedBook },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Update Failed!" },
    });
  }
};

const deleteBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const books = booksData.filter((book) => book._id !== _id);
    return res.status(200).json({
      success: { message: "Successful again!" },
      data: { books },
    });
  } catch (error) {
    return res.status(400).json({
      error: { message: "Not working!" },
    });
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
