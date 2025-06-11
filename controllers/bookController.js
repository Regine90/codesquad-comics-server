// const booksData = require("../data/books");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: {
        message: "This will lead to all the book pages in the books file.",
      },
      data: { books },
    });
  } catch (error) {
    return next(error);
  }
};

const getBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    // const book = booksData.find((book) => book._id === _id);

    if (!_id) {
      throw new Error("Id is required");
    }

    const book = Book.findById(_id);

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

const createBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("One of the fields is missing, please try again!");
    }

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

    await newBook.save();

    return res.status(201).json({
      success: { message: "Sucessful!" },
      data: { newBook },
    });
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;
  const { _id } = req.params;

  try {
    if (!title || !author || !pages) {
      throw new Error("One of the fields is missing, please try again!");
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
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
    if (!updateBook) {
      throw new Error("Book not found");
    }
    return res.status(201).json({});
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (req, res, next) => {
  const { _id } = req.params;

  try {

    if (!_id) {
      throw new Error("Id is required");
    }
    
    await Book.findByIdAndDelete(id);
    // const books = booksData.filter((book) => book._id !== _id);
    return res.status(200).json({
      success: { message: "Id was found!" },
      data: { books },
    });
  } catch (error) {
    return next(error)
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
