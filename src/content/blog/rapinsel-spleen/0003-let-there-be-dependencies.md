---
author: Olaf Luijks
pubDatetime: 2024-07-09T08:30:52.187Z
modDatetime: 2024-07-09T08:30:52.187Z
title: Side-Project Rapinsel-Spleen - Let there be dependencies (Part 3)
slug: sprs-part3-let-there-be-dependencies
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: And all things were made by Rust - Let there be dependencies
---

## Table of contents

## Project Dependencies

Alright, we will be using `Actix Web` to build our REST Api. It is a populair open-source web framework for Rust and it is extremely fast, at least that's what they say about it on their website. It's been around for a good 5 years I believe and it is pretty easy to use.

Let's install this framework and make an example endpoint to see how this all works:

Adding packages to your project is done by the command: `cargo add <packagename>`, so in our case:

```zsh
cargo add actix-web
```

This will install the latest version and also update the `Cargo.toml` file:

```toml
...
[dependencies]
actix-web = "4.8.0"
```

We also need the two following packages for handling json, so called Serializing and Deserializing. If that sounds like Chinese to you don't worry once we see some json output in our browser you will understand.

```zsh
cargo add serde --features "derive"
cargo add serde_json --features "preserve_order"
```

## Our first endpoint

Finally! Let's do some serious Rust plumbing...

We are not going to make a boring `Hello, world` but a real `health-check` endpoint for our api. This endpoint can be used by other progams to check if the api server is alive and kicking or dead as a doornail.

### Defining the HttpServer

In order for calling an endpoint we need a http server and actix-web let's you make one in just one line of code. Adjust the `main.rs` like so, I'll explain the code.

```rust
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

Breakdown of this piece of code: the first line `#[actix_web::main]` is a attribute macro and it tells our program that the main function is a Actix Web entry-point. In other words: we are saying that our Rust program will be a Rest Api from now on.

Then the interesting part, newing up a HttpServer. `.service(handler_function)` will call a function that will handle the endpoint request which we will make in a minute, `.bind("host", "port-number")` tells the server to listen on that host and port and then we start the server by calling `.run()`. The `async` and `.await?` makes the program run in a loop waiting for incoming requests and as last `Ok(())` to tell the program all is Ok as a result.

### Health check handler function

Defining an endpoint is just making a function that our main program can call. Basically it is a async function that implements a so called `Responder` for returning a form of Http response, in our case a json response. We decorate the function with a Actix Web attribute macro to tell it we are dealing with a `GET` request with a given path.

We generate a HttpResponse and attach a json object as a return value.

```rust
#[get("/health-check")]
pub async fn health_check_handler() -> impl Responder {
    HttpResponse::Ok().json(Status {
        status: "Ok".to_string(),
    })
}
```

But wait, what is that `Status` thing. Well that is a Rust struct, a type that is composed of other types. You can compare it with a `type` or `interface` if you are coming from TypeScript for example.

Our status struct has only one field with a type of string:

```rust
#[derive(Serialize)]
pub struct Status {
    pub status: String,
}
```

Again, we decorate the struct with a macro to tell it this struct is serializable. Serialization is a standard way to capture the object into a sharable format, in our case a json format, that's all. The `pub` keyword denotes it is a public struct with a public accessable field.

### Imports needed for the health check endpoint and main program

Almost there. At this point your code editor might give you trouble because it needs some imports and if you use the rust-analyzer extension it will help you, but let's try to think about what we need.

In my VSCode editor most of the keywords are highlighted in yellow and if I scan thru the code I can see the following keywords: `get`, `Serialize`, `Responder`, `HttpResponse`, `HttpServer` and `App` so we can define the imports, or in Rust language `use` statements as follows:

```rust
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;
```

The format of a `use` statement is like `use packagename::function_or_trait_or_whatever_you_can_use`

### Final code and testing our health check endpoint

```rust
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
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

Believe it or not, but this is all the code we need to spin up our Rest Api server and have it serve an endpoint. Let's compile and run this bad boy and see in our browser what the result is.

```zsh
cargo run
```

Browse to http://localhost:5174/health-check and BOOM!

```json
{
  "status": "Ok"
}
```

Mind blown right? That's what I'm talking about!

In the next chapter we will write a test for the health check endpoint we just made because we are good developers and good developers write tests all the time right? We also will talk a bit about the structure of our program to make it easier to extend if we going to make lots of different endpoints and eventually going to talk to a database.

## Using VSCode

It doesn't really matter which code editor you use, I switch a lot between VSCode, Zed and Sublime Text but if you are using VSCode it is useful to install the extension `rust-analyzer`. It will give you code completion, documentation on hover, automated imports and much more goodies.
