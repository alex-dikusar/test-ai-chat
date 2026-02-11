#!/bin/bash

echo "🚀 Setting up PostgreSQL database with Prisma..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start PostgreSQL container
echo "📦 Starting PostgreSQL container..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if container is running
if docker compose ps | grep -q "postgres.*running"; then
    echo "✅ PostgreSQL container is running"
else
    echo "❌ Failed to start PostgreSQL container"
    exit 1
fi

echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
cd api && npx prisma generate
cd ..

echo ""

# Run migrations
echo "📊 Running database migrations..."
echo "   (You'll be prompted to name your migration)"
cd api && npx prisma migrate dev
cd ..

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start the API server: npm run dev:api"
echo "  2. Open Prisma Studio: npm run prisma:studio"
echo ""
