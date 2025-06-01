---
author: Olaf Luijks
pubDatetime: 2025-06-01T08:00:56.756Z
modDatetime: 2025-06-01T08:44:42.338Z
title: My last Neovim configuration
slug: my-last-neovim-configuration
featured: true
draft: false
tags:
  - programming
description: Ever felt overwhelmed by endless Neovim configurations?
---

## Table of contents

## Introduction: Why I Chose LazyVim

I must have configured Neovim a thousand times. From scratch-built setups to community distributions like AstroVim, NvChad, and Kickstart.nvim, I've tried almost everything. Each one brought its own strengths, but none of them stuck for long. I'd always end up reconfiguring things, chasing plugin updates, or just getting bored and starting over.

That changed after I watched this excellent video by devaslife: [Effective Neovim Setup for Web Development Towards 2024](https://youtu.be/fFHlfbKVi30?si=YKCTCHy3SvcyagOf). It introduced me again to LazyVim, a modern, opinionated Neovim starter that actually felt sustainable. It is an older video but I had no issues following along.

Out of the box, LazyVim comes with well-chosen defaults and useful plugins already configured. I simply enabled the modules I regularly use, and I was essentially done. Adding or adjusting plugins is refreshingly simple, just drop a Lua file into the `plugins` directory and extend the opts. No boilerplate, no headaches.

After years of fiddling, this setup feels like the one I won't immediately want to rebuild. The rest of this post explains why.

## My Previous Configurations: A Brief Overview

My vim journey started like many others: copying someone else's config, breaking it, and learning from the ashes. Over time, I transitioned to Neovim with Lua, modularized my config, and explored community tools like `packer.nvim` and `mason.nvim`. Each change brought improvements, but also complexity.

I built things I was proud of scratchpad buffers, custom UI tweaks but maintaining all of it became a job in itself. As Neovim's ecosystem evolved rapidly, I found myself constantly chasing compatibility and reconfiguring old hacks. The joy was fading.

## LazyVim Setup: Modules and Plugins

LazyVim isn't just a plugin manager setup it's an entire framework built around `lazy.nvim`, offering sensible defaults, opinionated plugins, and smart module loading.

My configuration is essentially a layer on top of LazyVim. I've enabled a few modules like certain LSP servers or language-specific features.

The best part? I can now focus entirely on what matters: actual coding. LazyVim's plugin ecosystem handles a lot of the boilerplate, and updates are clean. If I ever want to go deeper, I still can. It's modular and open enough to let you override almost anything.

This is pretty much what I've added to my config:

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

## Final Thoughts: Why I'm Sticking with This Setup

I've called this post "My Last Neovim Configuration" not because I'm done learning, but because I've found a solid foundation that I'm confident will last. LazyVim gives me the polish and structure I was missing without locking me in.

Of course, nothing is ever truly final in the world of dotfiles but this is the first time I've felt like I'm not building a config for its own sake, but using a config that supports my work.

If you're stuck in config purgatory or just want something that works out of the box and evolves with the ecosystem, I'd recommend giving LazyVim a shot. And don't forget to give [devaslife](https://www.youtube.com/@devaslife) a thumbsup on YouTube.

> PS: My `dotfiles` repo is a mess, once I cleaned that up I'll update this post with a link to my config.
