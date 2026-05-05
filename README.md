# Canvas Batch Downloader

A browser extension that adds batch download controls to Canvas LMS module pages, so you can grab all course files in one click instead of downloading them one by one.

## Features

- **Download All** — download every file in a module with one click
- **Download Selected** — check individual files and download only those
- **Per-file download button** — quick single-file download icon on every attachment row
- **Progress counter** — button shows `1/N`, `2/N`, etc. while downloading
- Sequential downloads with automatic pacing to avoid browser throttling

## Installation

This extension is not on any store — you load it manually.

### Chrome / Edge
1. Go to `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this folder

### Firefox
1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file inside this folder

> Firefox temporary add-ons are removed on browser restart. For a permanent install, the extension would need to be signed.

## Usage

1. Navigate to a Canvas course's **Modules** page (`/courses/.../modules`)
2. Each module header gains **Download All** and **Download Selected** buttons
3. Each file row gains a checkbox (for selected downloads) and a direct download icon
4. Click **Download All** to fetch every file in that module, or check files and click **Download Selected**

## Credits

- Inspired by [canvas-file-downloader](https://github.com/PhantomOffKanagawa/canvas-file-downloader)
- [Canvas Student](https://icons8.com/icon/oECahFP3ibID/canvas-student) icon by [Icons8](https://icons8.com)
- [Download](https://icons8.com/icon/VGQlJM067vkN/download) icon by [Icons8](https://icons8.com)
