---
author: Olaf Luijks
pubDatetime: 2025-06-01T08:00:56.756Z
modDatetime: 2025-06-01T08:00:56.756Z
title: My last Neovim configuration
slug: my-last-neovim-configuration
featured: false
draft: false
tags:
  - programming
description: My last Neovim configuration using LazyVim
---

I must have configured Neovim for like a thousand times and I've tried almost every distro out there. AstroVim, NvChad, Kickstart.nvim and others. But after watching this excellent video [Effective Neovim setup for web development towards 2024](https://youtu.be/fFHlfbKVi30?si=7gkovwokeqRRUk6G) from devaslife I finally settled on using [LazyVim](https://www.lazyvim.org/).

Out of the box it has some sensible settings and plugins ready to go. All I did was enabled modules that I regurarly use and I was pretty much done. Configuring plugins is dead simple, just make a new file in the plugins directory and extend the `opts`.

```lua
-- copilot (ai)
{ import = "lazyvim.plugins.extras.ai.copilot" },
{ import = "lazyvim.plugins.extras.ai.copilot-chat" },

-- languages
{ import = "lazyvim.plugins.extras.lang.astro" },
{ import = "lazyvim.plugins.extras.lang.clangd" },
{ import = "lazyvim.plugins.extras.lang.docker" },
{ import = "lazyvim.plugins.extras.lang.git" },
{ import = "lazyvim.plugins.extras.lang.go" },
{ import = "lazyvim.plugins.extras.lang.json" },
{ import = "lazyvim.plugins.extras.lang.markdown" },
{ import = "lazyvim.plugins.extras.lang.rust" },
{ import = "lazyvim.plugins.extras.lang.svelte" },
{ import = "lazyvim.plugins.extras.lang.tailwind" },
{ import = "lazyvim.plugins.extras.lang.toml" },
{ import = "lazyvim.plugins.extras.lang.typescript" },
{ import = "lazyvim.plugins.extras.lang.yaml" },

-- formatters/linters
{ import = "lazyvim.plugins.extras.formatting.biome" },
{ import = "lazyvim.plugins.extras.formatting.prettier" },

-- misc
{ import = "lazyvim.plugins.extras.util.mini-hipatterns" }
```

Although configuring Neovim is a lot of fun, now I'm kinda done with that and I'm happy with my current setup using LazyVim. Give it a try, you will love it and don't forget to give devaslife some thumbs up.
