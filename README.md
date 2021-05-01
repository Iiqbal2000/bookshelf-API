# Bookshelf Rest API

Proyek ini merupakan submission dari Dicoding pada kelas " Belajar Membuat Aplikasi Back-End untuk Pemula". Proyek ini dibuat menggunakan framework HapiJS.

**1. Menyimpan Buku**
* Method request: `POST`
* URL: `/books`
* Properti request:
  |Field   |Type   |
  |---|---|
  |`name`   |string   |
  |`year`   |number   |
  |`author`   |string   |
  |`summary`   |string   |
  |`publisher`   |string   |
  |`pageCount`   |number   |
  |`readPage`   |number   |
  |`reading`   |boolean   |
* Status code: `201`
* Contoh body response:
  ```javascript
  {
      "status": "success",
      "message": "Buku berhasil ditambahkan",
      "data": {
          "bookId": "1L7ZtDUFeGs7VlEt"
      }
  }
  ```
* Status code: `400`
* Contoh body response:
  ```javascript
  {
      "status": "fail",
      "message": "Gagal menambahkan buku. Mohon isi nama buku"
  }
  ```
  ATAU
  ```javascript
  {
      "status": "fail",
      "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
  }

  ```
* Status code: `500`
* Contoh body response:
  ```javascript
  {
      "status": "error",
      "message": "Buku gagal ditambahkan"
  }
  ```
**2. Mendapatkan Seluruh Buku**
* Method request: `GET`
* URL: `/books`
* Status code: `200`
* Contoh body response:
  ```javascript
  {
      "status": "success",
      "data": {
          "books": [
              {
                  "id": "Qbax5Oy7L8WKf74l",
                  "name": "Buku A",
                  "publisher": "Tukang Cetak Buku 1"
              },
              {
                  "id": "1L7ZtDUFeGs7VlEt",
                  "name": "Buku B",
                  "publisher": "Tukang Cetak Buku 2"
              },
              {
                  "id": "K8DZbfI-t3LrY7lD",
                  "name": "Buku C",
                  "publisher": "Tukang Cetak Buku 3"
              }
          ]
      }
  }
  ```
**3. Menampilkan Detail Buku**
* Method Request: `GET`
* URL: `/books/{bookId}`
* Status code: `200`
* Contoh body response:
  ```javascript
  {
      "status": "success",
      "data": {
          "book": {
              "id": "aWZBUW3JN_VBE-9I",
              "name": "Buku E",
              "year": 2011,
              "author": "Joy",
              "summary": "Lorem Dolor sit Amet",
              "publisher": "Tukang Cetak Buku X",
              "pageCount": 200,
              "readPage": 26,
              "finished": false,
              "reading": false,
              "insertedAt": "2021-03-05T06:14:28.930Z",
              "updatedAt": "2021-03-05T06:14:30.718Z"
          }
      }
  }
  ```
* Status code: `404`
* Contoh body response:
  ```javascript
  {
      "status": "fail",
      "message": "Buku tidak ditemukan"
  }
  ```
**4. Memperbarui Detail Buku**
* Method request: `PUT`
* URL: `/books/{bookId}`
* Properti request:
  |Field   |Type   |
  |---|---|
  |`name`   |string   |
  |`year`   |number   |
  |`author`   |string   |
  |`summary`   |string   |
  |`publisher`   |string   |
  |`pageCount`   |number   |
  |`readPage`   |number   |
  |`reading`   |boolean   |
* Status code: `200`
* Contoh body response:
  ```javascript
  {
      "status": "success",
      "message": "Buku berhasil dihapus"
  }
  ```
* Status code: `404`
* Contoh body response:
```javascript
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```