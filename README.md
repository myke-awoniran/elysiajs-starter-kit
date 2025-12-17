# Elysia Starter Kit 🚀

A **plug-and-play backend scaffold** built with **ElysiaJS**, designed to help you start new projects fast without rebuilding the same infrastructure every time.

This starter kit comes with **authentication, database setup, Redis integration, middleware, and a clean project structure**—ready to extend and ship.

---

## ✨ Features

- ⚡ **ElysiaJS** – Fast, modern Bun-based web framework
- 🐘 **PostgreSQL** with **TypeORM**
- 🔴 **Redis** connector (caching, sessions, queues-ready)
- 🔐 **Authentication** built-in (extensible)
- 🧩 **Middleware** setup (logging, auth guards, etc.)
- 🏗️ Clean, scalable project structure
- 🔌 **Plug & Play** – clone, configure, and run

---

## 📁 Project Structure

```bash
src/
├── app.ts
├── server.ts
├── config/
│   ├── database.ts
│   ├── redis.ts
│   └── env.ts
├── services/
│   ├── auth/
│   ├── user/
│   └── ...
├── middlewares/
├── entities/
├── controllers/
└── utils/

🛠️ Tech Stack
Runtime: Bun
Framework: ElysiaJS
Database: PostgreSQL
ORM: TypeORM
Cache: Redis

🚀 Getting Started
1. Clone the repository
git clone https://github.com/myke-awoniran/elysiajs-starter-kit.git
cd elysia-starter-kit

2. Install dependencies
bun install

3. Configure environment variables
Create a .env file:
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key

4. Run the project
bun run dev
Server will be running at:
http://localhost:3000

🔐 Authentication
Authentication is pre-configured
PRs, issues, and suggestions are welcome.