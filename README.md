# Web-based Chat Application - DevChat

### By Romit Mohane - developed during the Technical Council's `What The Hack` hackathon.

---

### Project Overview

This is a simple web-based chat application built using `React.js` and `Firebase`. Allowing user authentication, search and live chat.

### Features

- User Authentication
- Search Users
- Real-time Messaging
- Clean and minimal design, inspired by the terminal (hence the 'Dev' in 'DevChat')

### Tech Stack

Build Tool: `Vite.js`
Frontend: `React.js` with `Typescript` (`sass` for stylesheets)
Backend: **Firebase** Firestore and Authentication
Database: **Firebase** Firestore

### File Structure

Since the app is setup using [`vite`](https://vitejs.dev/), with plugins for `react` and `typescript`, the file structure is similar to a react project. typescript config files are an addition.  
The hierarchy is as:

```text
├── public/
├── src/
|   └── components/     (has components segregated in different files and folders)
|   └── types/          (has typescript interfaces for `AppUser`, `Chat` and `ChatMessage`)
|   └── utils/          (has firestore utility code)
│   └── main and App react files
└── package.json
```

React components which have accompanying css are placed in their own folders along with their css.

### Hosting

_Not yet publically hosted, can be accessed from the college network_
