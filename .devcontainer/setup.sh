#!/bin/bash

echo "🚀 Setting up Full Stack Development Environment..."

# Remove any existing containers to avoid conflicts
echo "🧹 Cleaning up existing containers..."
docker-compose down --volumes --remove-orphans 2>/dev/null || true
docker rm -f postgres_db fastapi_backend react_frontend 2>/dev/null || true

# Install Python dependencies
echo "📦 Installing Python dependencies..."
cd backend && pip install -r requirements.txt
cd ..

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd frontend 
npm install --package-lock-only 2>/dev/null || true
npm install
cd ..

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 20

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

echo "✅ Setup complete! Your development environment is ready."
echo ""
echo "🌐 Access your applications:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo "   - Health Check: http://localhost:8000/health"
echo ""
echo "🔧 Useful commands:"
echo "   - docker-compose logs -f         # View logs"
echo "   - docker-compose restart         # Restart services"
echo "   - docker-compose down            # Stop services"
echo "   - docker-compose ps              # Check status"