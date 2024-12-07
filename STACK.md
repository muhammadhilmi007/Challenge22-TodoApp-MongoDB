Project MongoDB Async Breads (Browse, Read, Edit, Add, Delete and Sort)
================================
Project Membuat API menggunakan ExpressJS dan Menggunakan Database MongoDB dan 
BREADS (Browse, Read, Edit, Add, Delete and Sort) serta dilengkapi fitur pagination menggunakan Vanilla dan Jquery secara asynchronous.

Struktur Database:
================================
table users
name: string
phone: string

table todos
title: string
complete: boolean
deadline: datetime
executor: ObjectId(users._id)

Struktur API
================================
Users Endpoint
------------
GET /users
url : http://localhost:3000/users
method : GET
code : 200
request : {
    "page": 1,
    "limit": 5,
    "query": "",
    "sortBy": "_id",
    "sortOrder": "desc"
}
response : {
    "data": [
        {
            "_id": "5b5e9a4f9f4f4f4f4f4f4f4f",
            "name": "John Doe",
            "phone": "08123456789"
        },
        {
            "_id": "5b5e9a4f9f4f4f4f4f4f4f4f",
            "name": "John Doe",
            "phone": "08123456789"
        }
    ],
    "total": 6,
    "pages": 2,
    "page": 1,
    "limit": 5,
    "offset": 0
}
------------
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id

------------
Todos Endpoint
------------
GET /todos
url : http://localhost:3000/todos
method : GET
code : 200
request : {
    "page": 1,
    "limit": 5,
    "title": "",
    "complete": false,
    "startDate": "",
    "endDate": "",
    "sortBy": "_id",
    "sortOrder": "desc",
    "executor": ""
}
response : {
    "data": [
        {
            "_id": "5b5e9a4f9f4f4f4f4f4f4f4f",
            "title": "Belajar NodeJS",
            "complete": false,
            "deadline": "2020-01-01T00:00:00.000Z",
            "executor": "5b5e9a4f9f4f4f4f4f4f4f4f"
        },
        {
            "_id": "5b5e9a4f9f4f4f4f4f4f4f4f",
            "title": "Belajar JavaScript",
            "complete": false,
            "deadline": "2020-01-01T00:00:00.000Z",
            "executor": "5b5e9a4f9f4f4f4f4f4f4f4f"
        }
    ],
    "total": 6,
    "pages": 2,
    "page": 1,
    "limit": 5
}

------------
GET /todos/:id
POST /todos
PUT /todos/:id
DELETE /todos/:id

User Feature
-------------
Gunakan Vanilla Javascript untuk menyelesaikan fitur user ini.

User Interface Users
-------------
Tampilkan User Interface untuk Fitur User
- Tampilkan daftar user
- Tampilkan form tambah user
- Tampilkan form edit user
- Tampilkan form delete user

Browse Users
-------------
Pengguna dapat melakukan pencarian melalui form pencarian berdasarkan nama ataupun phone dalam satu input

Read Users
-------------
data yang ditampilkan itu dengan table berikut ini:
No. || Name || Phone || Actions
1      Rahmat   00939383    edit, hapus dan pindah ke halaman todos dengan url (http://localhost/user/:userid/todos)

Edit Users
-------------
Pengguna dapat menekan tombol edit untuk melakukan perubahaan data dengan modal untuk merubah nya data akan muncul.

Add Users
-------------
Pengguna dapat menekan tombol add untuk menambahkan user baru. dan modal untuk menambahkan user baru akan muncul.

Delete Users
-------------
Pengguna dapat menekan tombol delete untuk menghapus user. dan modal untuk menghapus user akan muncul.


Sort Users
-------------
Pengguna dapat mengurutkan data berdasarkan name atau phone secara asceding ataupun descending.

Limit Users
-------------
Pengguna dapat mengatur jumlah data yang dapat ditampilkan di table perhalaman, pilihan untuk limit disini yakni: 5,10,All, untuk pilihan all artinya semua data ditampilkan.

pagination Users
-------------
fitur read data user harus dilengkapi dengan fitur pagination yang dilengkapi dengan previous dan next serta keterangan yang menunjukkan data yang di tampilkan dari data yang ada dari total data.

Todo Feature
-------------
Setelah menekan icon pindah sebelah icon hapus, maka pengguna akan diarahkan ke fitur Todo yang menunjukkan kerjaan untuk setiap user yang dipilih.

gunakan jQuery untuk menyelesaikan fitur Todo ini.

User Interface Todo
-------------
Tampilkan User Interface untuk Fitur Todo
- Tampilkan daftar todo
- Tampilkan form pencarian berdasarkan nama
- Tampilkan form pencarian berdasarkan Deadline (startdate dan enddate) gunakan Moment JS dengan locale(id)
- Tampilkan form pencarian berdasarkan status Complete (Done/Not Yet)
- Tombol Reset
- Tombol Cari
- Tombol Sort by deadline

Browse Todo
-------------
Pengguna dapat melakukan pencarian melalui form pencarian berdasarkan title, deadline ataupun status complete dalam satu input.

Read Todo
-------------
data yang ditampilkan itu dengan bentuk alert berikut ini:
03-01-2020 02:33 Belajar NodeJS || button edit dan button delete
01-02-2020 05:33 Belajar JavaScript || button edit dan button delete

data yang ditampilkan adalah tanggal deadline beserta title dari todo.
untuk data berwarna hijau menandakan bahwa todo tersebut memiliki status sudah dikerjakan dengan status complete true

untuk data berwarna merah menandakan bahwa todo tersebut telah melewati tanggal deadline.

Edit Todo
--------------
perbaiki codingan ini dengan menggunakan jquery ajax dan fetch api
Pengguna dapat menekan icon pencil untuk perubahaan data, dan modal untuk merubah data akan muncul, dengan isi form title, deadline dan status complete.

Add Todo
--------------
Pengguna dapat menggunakan form tambah title untuk menambahkan data todo dengan hanya memasukkan title dari todo yang ingin ditambahkan, maka secara otomatis juga datetime sudah tergenerate berdasarkan waktu yang ada saat itu dengan default status complete false(not yet)

Delete Todo
--------------
Penggunaan dapat menekan icon trash untuk melakukan penghapusan data, dan modal untuk konfirmasi penghapusan data akan muncul.

Button Sort Todo
--------------
Pengguna hanya bisa mengurutkan data berdasarkan waktu deadline dari todo. dengan menekan tombol sort by deadline tersebut. pengguna dapat melakukan pengurutan secara asc/desc secara toggle (bergantian).

Pagination Todo
--------------
untuk fitur pagination dibuat dengan event scroll, sehingga ketika pengguna melakukan scrolling sampai bawah, maka data akan otomatis melakukan pagination dengan menambah data berikutnya ke tampilan.

Tech Stack
----------
Core Backend
1. Express Js
2. Node Js
3. MongoDB
4. Mongoose
5. Bcrypt
6. Json Web Token
7. Moment Js
8. Nodemon
9. Fetch API
10. CORS

Client Side
1. Bootstrap
2. Html
3. Font Awesome
4. Vanilla Js
5. Jquery

Database
1. MongoDB
2. Mongoose

=========
Error
=========
1. Sort di Users (selesai)
2. Ketika Edit User, maka namanya yang di list itu hilang
3. Reset users
4. pagination button previous dan next nya hilang ketika sdh di tekan button page 1 nya
5. datetime + 1 day
6. alert input baru warna abu abu
7. error di title todos
8. refresh page todos error
9. search todos error
