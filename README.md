# Programação com Ramon - A Computer Science Educational Platform

This is a computer science LMS (Learning Management System) platform. It is built with Next 13 with the App Router, Prisma as an ORM, Stripe for payments, and many more.

## Features

- Browse & Filter Courses
- Purchase Courses using Stripe
- Mark Chapters as Completed or Uncompleted
- Progress Calculation of each Course
- Student Dashboard
- Teacher mode
- Create new Courses
- Create new Chapters
- Easily reorder chapter position with drag n’ drop
- Upload thumbnails, attachments and videos using UploadThing
- Video processing using Mux
- HLS Video player using Mux
- Rich text editor for chapter description
- Authentication using Clerk
- ORM using Prisma
- MongoDB database

## Useful Commands

Run prisma studio

```
npx prisma studio
```

Format prisma schema

```
npx prisma format
```

Add new models to DB util

```
npx prisma generate
```

Push changes

```
npx prisma db push
```

Reset database

```
npx prisma migrate reset
```

Run local stripe server

```
stripe listen --forward-to localhost:3000/api/webhook
```

## Environment Variables

Create a .env file with the information bellow.

```
NODE_ENV=development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
STRIPE_API_KEY_DEV=
STRIPE_API_KEY_PROD=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TEACHER_ID=
NEXT_PUBLIC_LANGUAGE=portuguese
```

## Screenshots

![Desktop-1](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot01.png)
![Desktop-2](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot02.png)
![Desktop-3](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot03.png)
![Desktop-4](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot04.png)
![Desktop-5](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot05.png)
![Desktop-6](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot06.png)
![Desktop-7](https://github.com/ramonfrombr/programacaocomramon/blob/main/screenshots/screenshot07.png)
