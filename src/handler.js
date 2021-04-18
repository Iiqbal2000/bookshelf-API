/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage) ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  const nameIsBlank = newBook.name === '' || newBook.name === ' ' || newBook.name === undefined;
  const readPageGreater = newBook.readPage > newBook.pageCount;

  if (nameIsBlank) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (readPageGreater) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  // Jika ada data
  if (books.length > 0) {
    // Jika ada query name
    if (name !== undefined) {
      const queryName = name.toLowerCase();
      const filterBooksByName = books.filter((book) => book.name.toLowerCase().includes(queryName));
      // Jika query name ada di dalam data
      if (filterBooksByName.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: filterBooksByName.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
        response.code(200);
        return response;
      // Jika query name tidak ada di dalam data
      } else {
        const response = h.response({
          status: 'success',
          data: {
            books: [],
          },
        });
        response.code(200);
        return response;
      }
    // Jika ada query reading
    } else if (reading !== undefined) {
      const queryReading = Boolean(Number(reading));
      const filterBooksByRead = books.filter((book) => book.reading === queryReading);
      // Jika query reading ada di dalam data
      if (filterBooksByRead.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: filterBooksByRead.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
        response.code(200);
        return response;
      }
    // Jika ada query finished
    } else if (finished !== undefined) {
      const queryFinished = Boolean(Number(finished));
      const filterBooksByFinished = books.filter((book) => book.finished === queryFinished);
      if (filterBooksByFinished.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: filterBooksByFinished.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
        response.code(200);
        return response;
      }
    }
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  // Jika tidak ada data
  const response = h.response({
    status: 'success',
    data: {
      books: [],
    },
  });
  response.code(200);
  return response;
};

const getDetailBookHandler = (request, h) => {
  const {id} = request.params;
  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const {id} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const nameIsBlank = name === '' || name === ' ' || name === undefined;
  const readPageGreater = readPage > pageCount;
  const index = books.findIndex((book) => book.id === id);

  if (nameIsBlank) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } else if (readPageGreater) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } else if (index === -1) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  books.splice(index, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getDetailBookHandler,
  editBookByIdHandler,
  deleteNoteByIdHandler,
};
