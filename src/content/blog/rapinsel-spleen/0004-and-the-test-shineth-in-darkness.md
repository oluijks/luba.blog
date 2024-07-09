---
author: Olaf Luijks
pubDatetime: 2024-07-09T09:08:51.324Z
modDatetime: 2024-07-09T09:08:51.324Z
title: Side-Project Rapinsel-Spleen - To bear witness of the Test (Part 4)
slug: sprs-part4-and-the-test-shineth-in-darkness
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: And the Test shineth in darkness - To bear witness of the Test
---

## Table of contents

## Writing tests is sexy

We all love programming and writing tests is the cherry on top of the cake. So let's get super excited on writing a test for our health check endpoint. I know, normally we would write a test first and then implement the code for it, but we are learning, so this time around it is fine.

It doesn't matter where you put the code for a test but it is common to put it close to the implemented code, so be a good citizen and just dump the code in `main.rs`.

Starting early with writing tests not only helps you understand what you have written or about to write but it also helps making sure that your code keeps working in the future. But hey, you probably already knew that so let's dive into the dark world of writing tests.

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http::StatusCode, test, App};

    #[actix_web::test]
    async fn test_health_check_handler() {
        let app = test::init_service(App::new().service(health_check_handler)).await;
        let req = test::TestRequest::get().uri("/health-check").to_request();
        let resp = test::call_service(&app, req).await;

        assert_eq!(resp.status(), StatusCode::OK);

        let body = test::read_body(resp).await;
        let expected_json = serde_json::json!({
            "status": "Ok",
        });

        assert_eq!(body, serde_json::to_string(&expected_json).unwrap());
    }
}
```

Take your time, read it line by line and try to understand it. Basically it is comprised of making an app, a request and a response, calling the service and assert if the status and expected output is correct. We could talk about this for hours but this is just how you do it. There is nothing in this code that is weird or someting we have not seen already. It's all syntax. More important is knowing how to run this test and see that the test fails or gives you the beloved green ok. Play around with it, change the status and see how the test fails.

## Running the test

```zsh
cargo test
```

And the output would look something like:

```zsh
   Compiling backend v0.1.0 (/Code/backend)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 1.57s
     Running unittests src/main.rs (target/debug/deps/backend-c9cee311d72ed333)

running 1 test
test tests::test_health_check_handler ... ok <!-- this little 'ok' is your best friend

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

A failing test looks like this:

```zsh
   Compiling backend v0.1.0 (/Code/backend)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 1.39s
     Running unittests src/main.rs (target/debug/deps/backend-c9cee311d72ed333)

running 1 test
test tests::test_health_check_handler ... FAILED <!-- the wrath of Rust!

failures:

---- tests::test_health_check_handler stdout ----
thread 'tests::test_health_check_handler' panicked at src/main.rs:44:9:
assertion `left == right` failed
  left: b"{\"status\":\"Ok\"}" <!-- these lines are the ones who give you
 right: "{\"status\":\"Not Ok\"}" <!-- the reason the test has failed
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace


failures:
    tests::test_health_check_handler

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass `--bin backend`
```

The output by the Rust compiler or tests can be intimidating but take your time to read it. The more you see it the more comfortable you will be with it that is the purpose of this article, get familiar on how a test looks like in code, how to run it and understanding the test output.

## Improve the structure of our program

Like I said in the previous chapter we should begin with setting up a structure for our project. My suggestion looks like this but you are free to come up with your own structure. Ther are only a few things to make this work.

Create the following structure in your project:

```zsh
src
├── api
│   ├── health.rs
│   └── mod.rs
└── main.rs
```

Put the health check related code in `health.rs`. The `mod.rs` is a convention to make it possible to import and use this module in `main.rs`.

```rust
mod api; <!-- import the api module here

use actix_web::{App, HttpServer};
use api::health::health_check_handler;
... rest of the program
```

Compile and run your program again and run the test again and confirm that it is still working as expected. This is a small refactoring but it will benefit us when the project grows.

To be complete your code should look like this now:

`main.rs`

```rust
mod api;

use actix_web::{App, HttpServer};
use api::health::health_check_handler;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
        .service(health_check_handler))
        .bind(("127.0.0.1", 5174))?
        .run()
        .await?;

    Ok(())
}
```

`src/api/health.rs`

```rust
use actix_web::{get, HttpResponse, Responder};
use serde::Serialize;

#[derive(Serialize)]
pub struct Status {
    pub status: String,
}

#[get("/health-check")]
pub async fn health_check_handler() -> impl Responder {
    HttpResponse::Ok().json(Status {
        status: "Ok".to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{http::StatusCode, test, App};

    #[actix_web::test]
    async fn test_health_check_handler() {
        let app = test::init_service(App::new().service(health_check_handler)).await;
        let req = test::TestRequest::get().uri("/health-check").to_request();
        let resp = test::call_service(&app, req).await;

        assert_eq!(resp.status(), StatusCode::OK);

        let body = test::read_body(resp).await;
        let expected_json = serde_json::json!({
            "status": "Not Ok",
        });

        assert_eq!(body, serde_json::to_string(&expected_json).unwrap());
    }
}
```

`/src/api/mod.rs`

```rust
pub mod health;
```

Damn boy! We are learning and having fun, well I am I hope you are having fun as well.

In the next chapter we will be setting up a docker for a postgres database and use it within our program, installing sqlx, making database migrations and make a new endpoint to fetch data from the database: exciting stuff my dudes!
