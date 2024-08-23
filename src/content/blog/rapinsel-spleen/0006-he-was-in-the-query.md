---
author: Olaf Luijks
pubDatetime: 2024-07-09T18:58:25.897Z
modDatetime: 2024-07-09T18:58:25.897Z
title: Rapinsel-Spleen - And the data was fetched with sqlx (P6)
slug: sprs-part6-and-the-data-was-fetched-with-sqlx
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: He was in the data - And the data was fetched with sqlx
---

## Table of contents

## Installing sqlx and friends

Yeah the title says it: we will be using sqlx to get data out of our postgres database. What is it you might ask? Well it is a library to help you running queries on a database. One of the nice features of this library is that it checks your queries in compile-time so errors are caught early and won't make it into production. If you like to know more take a look at this link: [https://crates.io/crates/sqlx](https://crates.io/crates/sqlx)

Time to install sqlx and the features we need:

```zsh
cargo add sqlx --features tls-native-tls,runtime-async-std,postgres,chrono,uuid,macros
```

To be honest, I'm not sure what `tls-native-tls` and `runtime-async-std` does, I will have a look at that later and update this post. `chrono` is for handling date and times, `uuid` for generating universally unique identifiers and macros for compile-time checking.

## Databse migrations

Before I explain what a database migration is and before I forget this we have to install the `sqlx-cli` tool to generate and run migrations

```zsh
cargo install sqlx-cli --no-default-features --features postgres
```

In short you can use database migrations to incrementally build up your tables, insert or delete records and if things go south you can revert back in time. Once you see some examples you will hopefully understand it better then I can explain.

Let us be silent for a moment and create our first migration

```zsh
sqlx migrate add -r "init"
```

This will magically create the following files:

```zsh
migrations
├── 20240709193539_init.down.sql
└── 20240709193539_init.up.sql
```

The long number is a timestamp. In these files we can for example create a table (up) and revert back if something is wrong (down) so let's define a table. Populate these files with the following statement:

`/migrations/20240709193539_init.up.sql`

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

`/migrations/20240709193539_init.down.sql`

```sql
DROP EXTENSION IF EXISTS "uuid-ossp";
```

This extension is used to generate uuid's we talked about before.

## Create faqs table migration

Now, we are not making some stupid todo thing we are going to make a faqs system, so let's define a table for that.

```zsh
sqlx migrate add -r "create_faqs_table"
```

In the up file:

```sql
CREATE TABLE faqs (
    id UUID    NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4 ()),
    question   TEXT NOT NULL,
    answer     TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

And in the down file:

```sql
DROP TABLE IF EXISTS "faqs";
```

You get the drift on these migration files?

Now comes the fun part: actually running the migration and confirm that our faqs table is created

```zsh
sqlx migrate run
```

And what do you know, the table got created and I saw that is was good!

```
rapinsel=# \dt
              List of relations
 Schema |       Name       | Type  |  Owner
--------+------------------+-------+----------
 public | _sqlx_migrations | table | rapinsel
 public | faqs             | table | rapinsel
(2 rows)
```

Yup we have ourselfs a faqs table. The other table `_sqlx_migrations` is used by sqlx migration system so it is better to not touch that table.

Are you still with me? Did you manage to create the migrations and end up with a table in your database? Nice... it's time for a short break.

In the next chapter we will make an endpoint and query some faqs my friends.
