

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
  const { id } = req.params;

  try {
    if (!id) throw new Error("Id is required");

    const book = await Book.findById(id);
    if (!book) throw new Error("Book not found");

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
  const { id } = req.params;
  const { title, author, publisher, genre, pages, rating, synopsis, imageUrl } =
    req.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("One of the required fields is missing.");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        publisher,
        genre,
        pages,
        rating,
        synopsis,
        imageUrl,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }

    return res.status(200).json({
      success: { message: "Book updated!" },
      data: { updatedBook },
    });
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("Id is required");

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) throw new Error("Book not found");

    return res.status(200).json({
      success: { message: "Book deleted successfully!" },
      data: { id },
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
