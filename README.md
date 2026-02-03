# AI Chat App

A simple React + Vite chat app using [assistant-ui](https://assistant-ui.com) and OpenAI, with the API key loaded from an env file.

## Setup

1. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

2. **Configure OpenAI API key**

   Copy the example env file and add your key:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your OpenAI API key:

   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

   Get a key at [OpenAI API keys](https://platform.openai.com/api-keys).

## Running the app

You need both the **API server** (Express) and the **Vite dev server** running.

**Option A – run both with one command:**

```bash
npm run dev:all
```

**Option B – run in two terminals:**

- Terminal 1 (API server):

  ```bash
  npm run server
  ```

- Terminal 2 (Vite):

  ```bash
  npm run dev
  ```

Then open [http://localhost:5173](http://localhost:5173). The app proxies `/api/chat` to the API server on port 3001.

## Stack

- **React** + **Vite** – frontend
- **assistant-ui** – chat UI and runtime
- **Vercel AI SDK** – streaming and OpenAI integration
- **Express** – backend that calls OpenAI with the key from `.env`
