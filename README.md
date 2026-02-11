# Test AI Chat Application

A full-stack chat application with AI integration, built with React (Vite) and NestJS, using PostgreSQL for data persistence.

## Tech Stack

### Frontend (Client)
- React 19
- Vite
- TypeScript

### Backend (API)
- NestJS
- Prisma 7 (ORM)
- PostgreSQL
- OpenAI SDK

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 16

## Project Structure

```
test-ai-chat/
├── client/          # React frontend
├── api/             # NestJS backend
│   ├── src/
│   │   ├── prisma/  # Prisma service & module
│   │   └── chat/    # Chat module
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── prisma.config.ts   # Prisma 7 configuration
├── docker-compose.yml     # PostgreSQL container
└── .env                   # Environment variables
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker Desktop
- OpenAI API key

### Installation

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env`:
```env
OPENAI_API_KEY=your_actual_api_key_here
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test_chat_db?schema=public"
PORT=3001
```

3. **Set up the database:**

Option A - Automated setup (recommended):
```bash
./setup-database.sh
```

Option B - Manual setup:
```bash
# Start Docker Desktop first, then:
npm run docker:up
npm run prisma:generate
npm run prisma:migrate
```

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed database setup instructions.

### Development

**Start everything:**
```bash
npm run dev:all
```

This runs both the frontend (port 5173) and backend (port 3001) concurrently.

**Or start individually:**
```bash
# Frontend only
npm run dev

# Backend only
npm run dev:api
```

## Available Scripts

### Root Level

- `npm run dev` - Start frontend dev server
- `npm run dev:api` - Start backend dev server
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build all workspaces
- `npm run docker:up` - Start PostgreSQL container
- `npm run docker:down` - Stop PostgreSQL container
- `npm run docker:logs` - View PostgreSQL logs
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

### API Workspace

```bash
cd api

# Development
npm run start:dev

# Prisma commands
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
npm run prisma:push
```

## Database

### Models

The database includes example models for a chat application:

- **User**: User accounts with email and name
- **Message**: Chat messages linked to users

Customize these in `api/prisma/schema.prisma`.

### Prisma Studio

View and edit your database visually:

```bash
npm run prisma:studio
```

Opens at http://localhost:5555

### Migrations

Create a new migration after schema changes:

```bash
npm run prisma:migrate
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Required |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/test_chat_db?schema=public` |
| `PORT` | API server port | `3001` |

## Docker

The PostgreSQL database runs in Docker. Configuration in `docker-compose.yml`:

- **Container**: `test-chat-postgres`
- **Image**: `postgres:16-alpine`
- **Port**: `5432`
- **Database**: `test_chat_db`
- **User**: `postgres`
- **Password**: `postgres`

### Docker Commands

```bash
# Start database
npm run docker:up

# Stop database
npm run docker:down

# View logs
npm run docker:logs

# Reset database (removes all data)
docker compose down -v
npm run docker:up
npm run prisma:migrate
```

## Troubleshooting

### Database Connection Failed

1. Ensure Docker Desktop is running
2. Check if PostgreSQL container is running: `docker ps`
3. Check logs: `npm run docker:logs`
4. Verify `.env` has correct `DATABASE_URL`

### Port Already in Use

If port 5432 or 3001 is in use:

1. Change PostgreSQL port in `docker-compose.yml`
2. Update `DATABASE_URL` in `.env`
3. Change API port in `.env` (`PORT=3002`)

### Prisma Client Not Generated

Run:
```bash
npm run prisma:generate
```

## Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)

## License

Private project
