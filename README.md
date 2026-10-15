## Mini Message Board

**This project is done as part of [The Odin Project](https://www.theodinproject.com/).**

**Mini Message Board** is a full-stack Express web app where visitors can browse messages, view message details, and post new ones through a validated form. Unlike the initial in-memory version, this app features **full data persistence using PostgreSQL**, production database support, and robust server-side security.

It demonstrates server-side rendering with a clean UI built on [Pico CSS](https://picocss.com/) plus custom styles, modular routers, centralized error handling, and robust input sanitization.

---

## Features

- **Database Persistence** — messages are stored securely in a PostgreSQL database (locally for development and hosted on Neon for production)
- **Message list** — view all messages on the home page with links to details
- **Message details** — open a single message by id (text, author, date/timestamp)
- **New message form** — submit author and message text via `POST`
- **Robust Input Validation & Security** —
  - Server-side validation using `express-validator`
  - Bad words / profanity filtering using `bad-words`
  - Input sanitization and XSS / script injection protection (`.escape()`)
- **Custom Errors** — `MessageNotFound`, `EmptyFields`, `ValidationError`, and `PageNotFound` with appropriate status codes
- **Central error page** — unknown routes and thrown errors render a shared EJS error view
- **Styled UI** — Pico CSS base with custom typography, layout, and hover animations

---

## How to use

1. Open the home page to browse existing messages from the database.
2. Click **Add a new message** to open the form.
3. Fill in **author** and **message** (subject to length, profanity, and security validation), then submit — you are redirected to the home list.
4. Click **details** on any message to see author and timestamp.
5. Visit an invalid message id or unknown path to see the custom error page.

**Routes:**

| Path           | Method | Page                                |
| -------------- | ------ | ----------------------------------- |
| `/`            | `GET`  | Home — message list                 |
| `/new`         | `GET`  | New message form                    |
| `/new`         | `POST` | Validate & create message, redirect |
| `/message/:id` | `GET`  | Message details                     |

---

## Tech stack

| Layer          | Technology                                                           |
| -------------- | -------------------------------------------------------------------- |
| **Runtime**    | [Node.js](https://nodejs.org/) (ES modules)                          |
| **Server**     | [Express 5](https://expressjs.com/)                                  |
| **Database**   | [PostgreSQL](https://www.postgresql.org/) (`pg`, Neon Cloud)         |
| **Validation** | `express-validator`, `bad-words`                                     |
| **Templates**  | [EJS](https://ejs.co/)                                               |
| **CSS**        | [Pico CSS](https://picocss.com/) + custom `public/styles/styles.css` |
| **Tooling**    | npm, dotenv, Git / GitHub                                            |

---

## Getting started

**Prerequisites:** Node.js, npm, and a PostgreSQL instance (local or remote like Neon).

1. Clone the repository:
   ```bash
   git clone [https://github.com/saba-bar95/mini-message-board.git](https://github.com/saba-bar95/mini-message-board.git)
   cd mini-message-board
   ```
