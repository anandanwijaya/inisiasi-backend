# supply-chain

<h2>Usage</h1>

Silahkan melakukan clone pada repositori github di atas. Namun harus dipastikan bahwa folder tempat anda menyimpan clone repositori telah di inisiasi dengan git melalui perintah:

```
git init
```

Setelah itu silahkan lakukan clone repositori menggunakan perintah:
```
git clone git@github.com:anandanwijaya/supply-chain.git
```

Setelah selesai cloning, anda perlu menginstal beberapa package berikut:
```
npm i express bcrypt dotenv jsontoken prisma @prisma/client
```

Setelah selesai, anda juga harus menginstal package nodemon untuk menjalankan server secara otomatis, namun hanya digunakan dalam lingkungan production. Dengan perintah:
```
npm i nodemon —save-dev
```

Lalu setelah terinstall semua, anda perlu menjalankan prisma menggunakan perintah:
```
npx prisma init
```

Di dalam file env, anda harus melakukan setup untuk database yang akan digunakan.
```
DATABASE_URL="postgresql://postgres:1234@localhost:5432/inventory_management_backend"
```
Tuliskan postgresql menunjukkan jenis database yang digunakan, postgres menunjukkan username dari database yang digunakan oleh user, 1234 menunjukkan password database, localhost menunjukkan bahwa database running di local, 5433 menunjukkan port database, dan inventory_management_backend menunjukkan nama database yang akan dibuat.

Lalu anda dapat pergi ke file prisma/schema.prisma untuk mengatur struktur schema pada database seusai kebutuhan. 

Apabila anda telah selesai melakukan perancangan pada schema, anda dapat melakukan perintah migrate untuk menyimpan schema anda ke dalam database. Dengan menggunakan perintah:
```
npx prisma migrate dev --name init 
```

Apabila struktur pada schema anda benar, maka schema telah tersimpan di dalam database. Anda juga dapat melihat isi dari schema melalui prisma studio. Dengan perintah:
```
npx prisma studio 
```
