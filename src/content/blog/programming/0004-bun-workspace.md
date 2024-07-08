---
author: Olaf Luijks
pubDatetime: 2024-05-28T08:44:20.414Z
modDatetime: 2024-05-28T08:44:20.414Z
title: Setting up a bun workspace
slug: setting-up-a-bun-workspace
featured: false
draft: false
tags:
  - programming
description: Setting up a bun workspace (monorepo)
---

## Introduction

There are a lot of tools out there to manage a monorepo. I have tried a few (Lerna, Turborepo and Nx) but for smaller projects I found them a bit too much so I have settled on using `bun` workspaces. This is how I set up my workspace.

## Setup a bun workspace (aka monorepo)

In this example I want to make 3 apps in a monorepo, a documentation app, an API and a website, using VitePress, Hono and SolidStart respectively.

Create a new directory and navigate to it (replace `my-workspace` with the name of your workspace):

```bash
mkdir my-workspace && cd my-workspace
```

Initialize a new `bun` workspace by either running `bun init`, or manually create a `package.json`

```json
{
  "name": "my-workspace",
  "private": true,
  "workspaces": ["apps/docs", "apps/hono-api", "apps/solidstart-website"]
}
```

The `private` keyword is meant to be there so that this package is not accidentally published to npm.

You can now create your apps in the directories you specified in the `workspaces` array like you would normally do.

## Running your apps (concurrently)

Although bun has the ability to run scripts at the same time from your workspace, I prefer to use `concurrently` for this. It produces a cleaner output to your terminal.

```zsh
bun add -D concurrently
```

You can define a script like this to run all your apps concurrently:

```json
{
  "scripts": {
    "dev": "concurrently \"bun run --bun docs:dev\" \"bun run --bun hono:dev\" \"bun run --bun solid:dev\""
  }
}
```

You can do the same for the build or deploy step of course.

## Installing packages

If you install a package for one of you apps, Bun is smart enough to hoist the package to the root of the workspace. This way you can share packages between your apps. I encourage you to have a look at the bun documentation to see what else you can do with it: [https://bun.sh/docs/install/workspaces](https://bun.sh/docs/install/workspaces)

That's it! You now have a workspace/monorepo setup with `bun` workspaces. Enjoy coding!
