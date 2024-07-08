---
author: Olaf Luijks
pubDatetime: 2024-05-28T09:22:08.471Z
modDatetime: 2024-06-21T09:01:53.530Z
title: Zed Editor on Fedora
slug: zed-editor-on-fedora
featured: false
draft: false
tags:
  - programming
description: Zed Editor on Fedora
---

## Zed, the new kid on the block

I've been using Visual Studio Code for a while now and I'm getting tired of it and so for the last few months I've been using Sublime Text, but I saw a lot of video's about the new kid on the block called Zed. So I thought, let's give it a try. I installed it on my Fedora 39 system and I must say, I'm impressed. It is fast, has a clean interface and it is easy to use and configure. I'm going to use it for a while and see if it can replace Sublime Text for me. I'll keep you posted, but let me quickly show you how you can install it on Fedora, it is easy.

## Installing and updating Zed on Fedora

Make sure you have Rust on your system, if not you can install it with the following command:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Install some extra libraries:

```bash
script/linux
```

Clone the Zed repository:

```bash
git clone https://github.com/zed-industries/zed.git
```

```bash
cargo build --release
```

```bash
sudo ln -s target/release/Zed /usr/local/bin/zed
```

Now you can start Zed by typing `zed` in your terminal.

Additionally you can create a shortcut `zed.desktop` in your applications menu by creating a `.desktop` file in `/usr/share/applications/` or in `~/.local/share/applications` with the following content:

```ini
[Desktop Entry]
Version=1.0
Type=Application
Name=Zed
GenericName=Text Editor
Comment=A high-performance, multiplayer code editor.
TryExec=zed
StartupNotify=true
Exec=zed
Icon=~/Downloads/zed/crates/zed/resources/app-icon.png
Categories=TextEditor;Development;IDE;
Keywords=zed;
MimeType=text/plain;inode/directory;
StartupWMClass=dev.zed.Zed-Dev
```

## Updating Zed

To update Zed, navigate to the Zed source directory and run the following commands:

```bash
git pull && cargo build --release
```

That's it, enjoy Zed! 😄

PS: I forgot to mention that although Zed works fine on Fedora using Wayland, it is recommended to use it with Xorg for the best experience. For example resizing the window is not working properly on Wayland, but that seems to be a known issue and will be fixed in a future release hopefully. I switched to Xorg and to be honest I don't notice any difference.

## Update

You can now just install it by running 😄

```bash
./script/install-linux
```
