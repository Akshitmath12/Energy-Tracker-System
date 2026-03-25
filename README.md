EnergyTracker 
A full-stack wellness tracking application that helps you log, visualise, and improve your daily energy levels using AI-powered insights.
Built with Next.js, TypeScript, PostgreSQL, Prisma, and OpenAI API.

Screenshots
📝 Daily Log
Log your daily metrics including energy, motivation, stress, sleep, water, caffeine, and exercise.
Show Image
📊 Analytics Dashboard
Visualise your trends over time with interactive charts for energy, sleep, stress, and more.
Show Image
📅 History
View all your past entries in a clean chronological timeline.
Show Image

Features

🔐 User Authentication — Secure login and logout with session management
📝 Daily Logging — Track Energy, Motivation, Stress, Sleep, Water, Caffeine, and Exercise
📊 Analytics Dashboard — Average metrics summary cards + interactive line/bar charts over time
📅 Entry History — Chronological view of all past entries
🤖 AI Insights — OpenAI-powered personalised energy management suggestions based on your data
📱 Responsive UI — Works across desktop and mobile


Tech Stack
LayerTechnologyFrontendNext.js 14, TypeScript, React HooksStylingTailwind CSSBackendNext.js API RoutesDatabasePostgreSQL + Prisma ORMAIOpenAI APIAuthJWT / Session-based authentication

Getting Started
Prerequisites

Node.js 18+
PostgreSQL database
OpenAI API key

Installation
bash# Clone the repository
git clone https://github.com/Akshitmath12/Energy-Tracker-System.git

# Navigate into the project
cd Energy-Tracker-System

# Install dependencies
npm install
Environment Setup
Create a .env file in the root directory:
envDATABASE_URL="postgresql://user:password@localhost:5432/energy_tracker"
OPENAI_API_KEY="your_openai_api_key"
NEXTAUTH_SECRET="your_secret_key"
Database Setup
bash# Run Prisma migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view your database
npx prisma studio
Run the App
bashnpm run dev
Open http://localhost:3000 in your browser.

Project Structure
src/
├── app/
│   ├── page.tsx          # Daily log form
│   ├── analytics/        # Analytics dashboard
│   ├── history/          # Entry history
│   └── api/              # REST API routes
├── components/           # Reusable UI components
└── lib/                  # Prisma client, utilities
prisma/
└── schema.prisma         # Database schema
