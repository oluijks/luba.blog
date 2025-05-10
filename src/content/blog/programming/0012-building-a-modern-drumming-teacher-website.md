---
author: Olaf Luijks
pubDatetime: 2025-05-10T22:01:18.662Z
modDatetime: 2025-05-10T22:01:18.662Z
title: Building a Modern Drumming Teacher Website with TanStack Start Tailwind CSS, and Convex
slug: building-a-modern-drumming-teacher-website
featured: true
draft: false
tags:
  - programming
  - personal
description: Learn how I built a fast, SEO-ready website for a drumming teacher using TanStack Start, Tailwind CSS, and Convex—ideal for modern, maintainable web projects
---

Recently, I built a new website for my drumming teacher, Ron van Elswijk. The goal was to create a fast, modern, and maintainable platform that would serve as both a personal portfolio and an entry point for students. It's currently in a test phase, but the core tech is solid and ready to scale.

In this post, I'll walk through the tech stack I chose—TanStack Start, Tailwind CSS, and Convex—and share some of the architectural decisions behind the project.

---

# ⚙️ The Stack

## 🧱 TanStack Start

I used TanStack Start as the foundation. It offers:

- File-based routing with TanStack Router
- Server-side rendering by default
- Great TypeScript support
- Blazing fast development workflow

TanStack Start is a fantastic fit for projects that need performance, flexibility, and SEO right out of the box. Since this site is intended to attract new students, search engine visibility was important from day one.

## 🎨 Tailwind CSS (v4)

The UI is styled using Tailwind CSS, which gave me:

- Rapid styling with utility classes
- A consistent, modern look
- Easy responsiveness and layout control

I leaned on Tailwind's grid utilities to create structured, clean layouts, and kept the design minimal so the focus stays on content and usability.

## 🧠 Convex Backend

For the backend, I integrated Convex, a reactive serverless database. While the current site is mostly static, Convex gives us a future-proof backend. Potential additions include:

- A student login portal
- Booking or lesson scheduling
- A content management interface

Convex is great because it handles data syncing, auth, and real-time updates out of the box—all without writing REST or GraphQL endpoints.

## 🔐 Type Safety and Maintainability

One of my core goals was future maintainability. That's why I chose TypeScript end-to-end. Any future developer working on this site (or I myself, coming back months later) will benefit from strong type hints and fewer surprises.

## 🚀 Fast and SEO-Friendly

Thanks to SSR, prerendering, and a lightweight frontend, the site is incredibly fast and SEO-optimized. Page loads are near-instant, and all static pages are crawlable by search engines. It's ready to scale as Ron's online presence grows.

## 🧪 Try It Out

You can visit the test version here:
👉 https://test-ronvanelswijk.luba.dev/

We're still in the testing phase, so feedback is welcome!

## 💬 What's Next?

Next steps might include:

- Adding blog content or teaching resources
- Embedding YouTube videos or lesson previews
- Launching a booking system using Convex auth and actions

This has been a fun and rewarding project, and I'm excited to iterate further.

## ⭐ Follow the Project

Once the site goes live, I'll publish the full source code on GitHub for others to explore, fork, or contribute to. If you're interested in modern, full-stack web development with TanStack, Tailwind, and Convex, stay tuned—and don’t forget to star the repo when it drops!
