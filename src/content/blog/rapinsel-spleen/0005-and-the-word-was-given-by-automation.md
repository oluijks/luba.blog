---
author: Olaf Luijks
pubDatetime: 2024-07-09T18:43:33.187Z
modDatetime: 2024-07-09T18:43:33.187Z
title: Side-Project Rapinsel-Spleen - For the law was given by Make (Part 5)
slug: sprs-part5-and-the-word-was-given-by-automation
featured: false
draft: false
tags:
  - personal
  - programming
  - side-projects
  - rust
description: And the word was given by automation - For the law was given by Make
---

## Table of contents

## Cargo watch

You already have noticed that every time you make a change you have recompile but there is a handy watcher we can install that will do that for us.

Let's create a `Makefile` in the root of our project:

```zsh
touch Makefile
```

And define a `dev` command

```makefile
dev:
	cargo watch -q -c -w src/ -x run
```

Install cargo watch:

```zsh
cargo install cargo-watch
```

And voila we can now start it up by running:

```zsh
make dev
```

## Postgres in Docker

Nowadays spinning up a database couldn't be easier with Docker. I'll assume you have docker installed on your system. If not please refer to these docs to install docker.

[Install Docker on Fedora](https://docs.docker.com/engine/install/fedora/)

[Install Docker on Windows](https://docs.docker.com/desktop/install/windows-install/)

<hr>

We need two files: a `.env` file for our environment variables and a `docker-compose.yml` where we can define what system and database we want to have.

Create these files in the root of our project:

```zsh
touch .env docker-compose.yml
mkdir -p data/pgdata # this will save the postgres data on your local disk
```

In `.env` we put the postgres connection string (you can rename the variables to anything you like)

```ini
# Postgres
DATABASE_URL="postgresql://rapinsel:secret@localhost:5432/rapinsel"

# Docker
DOCKER_IMAGE="postgres:16.3-alpine"
CONTAINER_NAME="postgres-rapinsel"
POSTGRES_DB="rapinsel"
POSTGRES_USER="rapinsel"
POSTGRES_PASSWORD="secret"
```

The `docker-compose.yml` I basically copied from the Docker website and looks like this:

```yml
version: "3.9"
services:
  db:
    image: ${DOCKER_IMAGE}
    container_name: ${CONTAINER_NAME}
    shm_size: 128mb
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 1s
      timeout: 5s
      retries: 10
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    user: 1000:1000
    volumes:
      - ./data/pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Now all we have to do is run this command to start our postgres docker:

```zsh
docker-compose up -d
```

And if you want to stop the database issue this command:

```zsh
docker-compose down
```

Finally you could update the `Makefile` like I have done to save some keystrokes and live longer.

```make
# Docker
dup:
	docker-compose up -d
ddown:
	docker-compose down
```

## Useful VSCode extensions

If you are using VSCode you could install these extensions: [Database Client JDBC](https://marketplace.visualstudio.com/items?itemName=cweijan.dbclient-jdbc) to have a nice gui to connect and interact with your postgres database and the [Docker Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) but if you have your own tools that's fine too, use whatever you like.

Play and poke around in your database and docker instance and if you mess up, no worries you can always delete the whole crap and start over.

In the next chapter we...
