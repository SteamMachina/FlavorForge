[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vIPPSmsE)
# lab-05 ORM

We will follow quick start for prisma tutorial but with combination of express
https://www.prisma.io/docs/getting-started/quickstart

Prepaer the project:
1. Install the prisma in this project
 `npm install prisma --save-dev`

2. Init the sqlite `npx prisma init --datasource-provider sqlite`

3. Find the file `prisma/schema.prisma` 
and add into it:
```javascript
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```
  Models in the Prisma schema have two main purposes:

  Represent the tables in the underlying database
  Serve as foundation for the generated Prisma Client API

4. Run the migration `npx prisma migrate dev --name init`
 
    This command did two things:
    It creates a new SQL migration file for this migration in the prisma/migrations directory.
    It runs the SQL migration file against the database.
    Because the SQLite database file didn't exist before, the command also created it inside the prisma directory with the name dev.db as defined via the environment variable in the .env file.

----------------
Now your DB and prisma is setup. 

5. Let's create a first user running `node script.js` it should print you the newly created user. 

Let's work on the tasks in `src/server.js`