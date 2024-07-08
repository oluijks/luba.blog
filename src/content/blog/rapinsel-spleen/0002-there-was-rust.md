---
author: Olaf Luijks
pubDatetime: 2024-07-08T21:51:24.845Z
modDatetime: 2024-07-08T21:54:43.438Z
title: Side-Project Rapinsel-Spleen - There was Rust (Part 2)
slug: sprs-part1-there-was-rust
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: There was Rust - Installing Rust and project dependencies
---

## Table of contents

## Installing Rust (Linux)

On Fedora (which I'm using) installing Rust can be done in two ways but the preferred one is to use `rustup`.

```zsh
sudo dnf install rust cargo
sudo dnf install rustup
```

> If you are a Windows user: have a look at this document: <br><br>[Set up your dev environment on Windows for Rust](https://learn.microsoft.com/en-us/windows/dev-environment/rust/setup)

Check to see if your installation is successful and looks something like this:

```zsh
> cargo --version
cargo 1.79.0 (ffa9cf99a 2024-06-03)
> rustc --version
rustc 1.79.0 (129f3b996 2024-06-10)
```

You are officially a Rust developer now!

## Cargo our backend project

Ok, let's continue and create our backend project with the following command:

```zsh
cargo new --bin backend
```

The project you just created should look like:

```zsh
.
├── Cargo.toml
└── src
    └── main.rs
```

And the `Cargo.toml` has no dependencies yet:

```zsh
[package]
name = "backend"
version = "0.1.0"
edition = "2021"

[dependencies]
```

If you take a look at `src/main.rs` you see the this complicated code:

```rust
fn main() {
    println!("Hello, world!");
}
```

If you ever done something in C, C++ or Java this should look pretty familiar to you. `main` is where the program starts, `fn` is short for `function` and `println!` is a Rust macro that barfs out text in your console. If you see a keyword in Rust that end with a `!` it is probably a macro, but we will learn more on macros as we are going to use them in the future.

If you made it this far: be proud of yourself, but wait! Let's compile and run this bad mofo and see if it actually works!

```zsh
cargo run
```

If you see `Hello, world!`: I salut you Rust Guru and don't forget to update your resume 😉

```zsh
   Compiling backend v0.1.0 (/Code/backend)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.26s
     Running `target/debug/backend`
Hello, world!
```

In the next chapter we will look at all the dependencies we need and install them into our project. When that is all done we can finally write some nifty Rust code and have the compiler yell at us like a true mother in law 😉
