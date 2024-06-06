# Drizzle with Nextjs14 

This article will show how to setup Drizzle in Nextjs FrameWork.

1) install nextjs

```bash
npx create-next-app@latest
```
after install nextjs14, we need to update the package.json because of react has compatible problems with drizzle in this nextjs version.

```bash
npm update --save
npm update -D
```

2) setup Supabase

We only use the Supabase to create an empty database named drizzle-nextjs-test

3) DATABASE_URL variable

Back to our project, We need write the DATABASE_URL variable into .env file in our root of project

The DATABASE_URL can be copied form our database we created before or you can follow the path I pointed blow:
> chooose our databse, then click on the projectSettings from sidebar ->CONFIGURATION section(Database button)


```txt
DATABASE_URL="postgresql://postgres:[your_password]@db.qlwonwgdrdlavrrtaioy.supabase.co:5432/postgres"
```
Here, the drizzle only support the ***IPV6*** version link to connect supabase. And here you should notice that you only replace the password in this link and remove the '[]',do not change other sections

Finally, write this in our .env file.

4) setup drizzle

1. create an db file for connecting database.

We installed the extra packages except drizzle to make drizzle enable to find the environment variable using dotenv.


> src/db/drizzle.ts
```bash
npm i drizzle-orm postgres
npm i -D drizzle-kit
npm i dotenv
```
```sql
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);
```
2. create table using Drizzle instead of DDL

we create a file for defining table structure

> src/db/schema.ts
```ts
export const users= pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
});

```
3. create drizzle.config.ts

We create this file in the root of nextjs.

```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './db/schema.ts',
  out: "./supabase/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```
4. finally push table in our supabase

```bash
npx drizzle-kit migrate
```
generating the sql file when using 'out' property in drizzle.config.ts when you needed.


then push schema into our database
```sql
npx drizzle-kit push
```

5) query and opeations

Now you can use query fuctions from drizzle like:
```ts
db.select().form(users)
```
But you also need follow the rules of server and client components in nextjs.
