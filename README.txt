https://nodejs.org/en/download/package-manager/current
https://www.postman.com/downloads/
https://dev.mysql.com/downloads/workbench/
https://code.visualstudio.com/download


-----------Server---------------
npm init -y
npm install express morgan cors nodemon bcryptjs jsonwebtoken


MySQL
prisma
Tam123456


npm install prisma
npx prisma init
npm install @prisma/client

// Doc ใช้ในการสร้างและอัพเดตฐานข้อมูล
npx prisma migrate dev --name ecom



// update Scheme
npx prisma db push   // no log
npx prisma migrate dev --create-only
npx prisma migrate dev --name ecom


//
อัพเดต Prisma schema
npx prisma migrate dev



------------Client--------------
npm create vite@latest .
- client
- javascript

>cd client
>npm install
>npm run dev

npm install axios


--------------------------
MySQL
prisma
Tam123456












-----------Server---------------
npm init -y
npm install express mongoose morgan body-parser cors nodemon socket.io
npm i cloudinary
npm install google-auth-library


------------Client--------------
npm create vite@latest
- client
- javascript

>cd client
>npm install
>npm run dev

npm install @radix-ui/themes
npm i zustand axios
npm i react-router-dom
npm install @react-oauth/google@latest


npm i react-image-file-resizer
npm i react-toastify
npm i react-icons
npm i lucide-react
npm i lodash
npm i rc-slider
npm i numeral
npm install moment

npm install react-hook-form zod @hookform/resolvers zxcvbn

--------------------------




--------- Deploy DB to Supabase ------
1. Login Supabase
2. .env
        DATABASE_URL = ""
        DIRECT_URL = ""
3. schema.prisma
        datasource db {
        provider  = "postgresql"
        url       = env("DATABASE_URL")
        directUrl = env("DIRECT_URL")
        }

npx prisma db push
----When update ----
- DATABASE_URL : "?pgbouncer=true&connection_limit=1"
npx prisma db push


/* Enjoy */
--------- Deploy Server to Vercel ------
1. create vercel.json

{
    "version": 2,
    "name": "roitai",
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "server.js",
        "headers": {
          "Access-Control-Allow-Origin": "*"
        }
      }
    ]
  }

2. package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server",
    "postinstall": "prisma generate"
  },
  

  git init
  git add . 
  git commit -m "init"
  git push..........

3. add project to vercel
3.1 in build command
npx prisma generate
3.2 add env
/* Enjoy */




--------- Deploy Client to Vercel ------
1. create vercel.json

{
    "routes":[
        {
            "src":"/[^.]+",
            "dest":"/"
        }
    ]
}

2. git init
3. git add .
4. git commit -m "init"

5. add project to vercel 
/* Enjoy */