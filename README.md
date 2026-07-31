## Mini Message Board

**This project is done as part of [The Odin Project](https://www.theodinproject.com/).**

**Mini Message Board** is a small Express web app where visitors can browse messages, open message details, and post new ones through a form. Messages are stored in memory for the lifetime of the server process — a classic Odin Project exercise for learning Express routing, EJS templates, and request handling.

It demonstrates server-side rendering with a clean UI built on [Pico CSS](https://picocss.com/) plus custom styles, modular routers, and custom error classes with a centralized Express error handler.

---

## Features

- **Message list** — view all messages on the home page with links to details
- **Message details** — open a single message by id (text, author, date)
- **New message form** — submit author and message text via `POST`
- **Input validation** — rejects empty author/message fields
- **Custom errors** — `MessageNotFound`, `EmptyFields`, and `PageNotFound` with status codes
- **Central error page** — unknown routes and thrown errors render a shared EJS error view
- **Styled UI** — Pico CSS base with custom typography, layout, and hover animations

---

## How to use

1. Open the home page to browse existing messages.
2. Click **Add a new message** to open the form.
3. Fill in **author** and **message**, then submit — you are redirected to the home list.
4. Click **details** on any message to see author and timestamp.
5. Visit an invalid message id or unknown path to see the error page.

**Routes:**

| Path           | Method | Page                                 |
| -------------- | ------ | ------------------------------------ |
| `/`            | `GET`  | Home — message list                  |
| `/new`         | `GET`  | New message form                     |
| `/new`         | `POST` | Create message, then redirect to `/` |
| `/message/:id` | `GET`  | Message details (1-based index)      |

---

## Tech stack

| Layer         | Technology                                                           |
| ------------- | -------------------------------------------------------------------- |
| **Runtime**   | [Node.js](https://nodejs.org/) (ES modules)                          |
| **Server**    | [Express 5](https://expressjs.com/)                                  |
| **Templates** | [EJS](https://ejs.co/)                                               |
| **CSS**       | [Pico CSS](https://picocss.com/) + custom `public/styles/styles.css` |
| **Tooling**   | npm, Prettier (`prettier-plugin-ejs`), Git / GitHub                  |

---

## Getting started

**Prerequisites:** Node.js and npm.

```bash
git clone https://github.com/saba-bar95/mini-message-board.git
cd mini-message-board
npm install
node app.js
```

Open **http://localhost:3000**.

> Messages live in an in-memory array. Restarting the server resets them to the seed data.

---

## Project structure

```
mini-message-board/
├── app.js                 # Express app, middleware, error handlers
├── errors/                # Custom error classes
│   ├── emptyFields.js
│   ├── messageNotFound.js
│   └── pageNotFound.js
├── routes/                # Routers
│   ├── indexRouter.js     # Home + POST /new (messages store)
│   ├── newRouter.js       # GET /new form
│   └── messageRouter.js   # GET /message/:id
├── views/                 # EJS templates
│   ├── partials/head.ejs
│   ├── index.ejs
│   ├── form.ejs
│   ├── message.ejs
│   └── error.ejs
└── public/styles/         # Static CSS
```

---

## Author

**Saba Barbakadze**

[GitHub Profile](https://github.com/saba-bar95)
