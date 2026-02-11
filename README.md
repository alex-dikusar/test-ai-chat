# AI Chat App

A full-stack monorepo: React + Vite client and NestJS API, using [assistant-ui](https://assistant-ui.com) and OpenAI.

## Structure

- **`client/`** – React + Vite frontend (assistant-ui, Vercel AI SDK transport)
- **`api/`** – NestJS backend (OpenAI streaming, title generation)

## Setup

1. **Install dependencies** (from repo root):

   ```bash
   npm install
   ```

2. **Configure OpenAI API key**

   Copy the example env file and add your key at the **project root**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `OPENAI_API_KEY`. The API loads `.env` from the project root (or from `api/` if you prefer). Get a key at [OpenAI API keys](https://platform.openai.com/api-keys).

## Running the app

You need both the **API** (NestJS) and the **client** (Vite) running.

**Option A – run both with one command:**

```bash
npm run dev:all
```

**Option B – run in two terminals:**

- Terminal 1 (NestJS API):

  ```bash
  npm run dev:api
  ```

- Terminal 2 (Vite client):

  ```bash
  npm run dev
  ```

Then open [http://localhost:5173](http://localhost:5173). The client proxies `/api` to the API on port 3001.

## Scripts (from root)

| Script       | Description                    |
| ------------ | ------------------------------ |
| `npm run dev`      | Start client only              |
| `npm run dev:api`  | Start API only (watch mode)    |
| `npm run dev:all`  | Start API + client             |
| `npm run build`    | Build client and API           |

## Stack

- **React** + **Vite** – frontend
- **assistant-ui** – chat UI and runtime
- **Vercel AI SDK** – streaming and OpenAI integration
- **NestJS** – backend (chat and title endpoints, OpenAI with key from root `.env`)
