---
author: Olaf Luijks
pubDatetime: 2024-05-28T22:01:57.251Z
modDatetime: 2024-05-28T22:01:57.251Z
title: Virtual Machine Manager
slug: virtual-machine-manager
featured: false
draft: false
tags:
  - programming
  - linux
description: Trying out any linux distro with Virtual Machine Manager
---

## Trying out any linux distro with Virtual Machine Manager

I remember in the old days you had to recompile your kernel to get your hardware working. Nowadays, you can just download a linux distro and install it on your machine without any hassle for the most part. But what if you want to try out a distro without installing it on your machine? That's where Virtual Machine Manager comes in.

Find the Virtual Machine Manager in your package manager and install it. You can then create a new virtual machine and install any linux distro you want. You can even try out different desktop environments to see which one you like best. If you on Fedora like me you don't have to do anything else but install the Virtual Machine Manager. Just follow the steps in the docs: [https://docs.fedoraproject.org/en-US/quick-docs/virtualization-getting-started/](https://docs.fedoraproject.org/en-US/quick-docs/virtualization-getting-started/)

I am running Kali 2024.1 for my study and if I accidentally fuck it up I just download the premade diskimage from the Kali website and I'm back in business in like 10 minutes. It is a fantastic tool to quickly spin up a distro and learn how that system works.

![Bogdan](@assets/images/kali-2024.1-on-qemu-kvm.png)
