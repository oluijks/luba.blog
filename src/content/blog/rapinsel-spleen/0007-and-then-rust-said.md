---
author: Olaf Luijks
pubDatetime: 2024-07-14T09:14:19.625Z
modDatetime: 2024-07-14T09:14:19.625Z
title: Rapinsel-Spleen - Let us fetch faqs, so that the answers may rule over the questions (P7)
slug: sprs-part7-and-then-rust-said
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: And then Rust said - Let us fetch faqs, so that the answers may rule over the questions
---

## Table of contents

## Creating an endpoint for showing all the faqs

Create a new file in the `src/api` directory and modify the `mod.rs`

```zsh
cd src/api
touch faqs.rs
echo "pub mod faqs;" >> mod.rs
```

sqlx has a macro that is called `query_as!`. You can give it your model (struct), your query string and then you can call a function like `fetch_all`, `fetch_one` or `fetch_optional` to fetch the data.

In our case we want to fetch all the faq records so we would like to use the `fetch_all` function. The `fetch_all` requires a so called `executor` and that is a reference to our postgres database.

```rust
sqlx::query_as!(YourModel, "<your query here>")
    .fetch_all(&state.db)
    .await;
```

So let's rewrite that for our situation like:

```rust
sqlx::query_as!(FaqModel, "SELECT * FROM faqs")
    .fetch_all(&state.db)
    .await;
```

## Our Faq Model (struct)

Defining a model is a matter of creating a struct with all the fields we need to create or read a faq.

```rust
pub struct FaqModel {
    pub id: Uuid,
    pub question: String,
    pub answer: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}
```

The struct 'mirrors' our sql statement remember?

```sql
CREATE TABLE faqs (
    id UUID NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4 ()),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Our endpoint will look something like this. Read it, try to understand it and then we'll break it down...

```rust
#[get("/faqs")]
pub async fn fetch_faqs_handler(state: Data<AppState>) -> HttpResponse<BoxBody> {
    let query_result: Result<Vec<FaqModel>, sqlx::Error> =
        sqlx::query_as!(FaqModel, "SELECT * FROM faqs")
            .fetch_all(&state.db)
            .await;

    match query_result {
        Ok(faqs) => {
            let faqs_response = FaqsResponse {
                status: "success".to_string(),
                data: faqs,
            };
            HttpResponse::Ok().json(faqs_response)
        }
        Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
    }
}
```

We've seen the query part. The variable `query_result` is of a type that represents either success `(Ok)` or failure `(Err)` so we can match those to return either the faqs or an error response.

But before we can implement all this juicy things let's get connected to our postgres database.

## Postgres database connection

In `src/main.rs` we define our `AppState` that holds a reference to our postgres pool

```rust
pub struct AppState {
    db: Pool<Postgres>,
}
```

And before we create our Http Server we make the connection:

```rust
let pool: Pool<Postgres> = match PgPoolOptions::new()
    .max_connections(10)
    .connect("postgresql://rapinsel:secret@localhost:5432/rapinsel")
    .await
{
    Ok(pool) => {
        println!("[pdb] pool created");
        pool
    }
    Err(err) => {
        println!("[pdb] failed to create pool: {:?}", err);
        std::process::exit(1);
    }
};
```

In the next chapter we...
