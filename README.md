# Query GPT

![Query GPT](public/query-gpt.png)

> Convert natural language to SQL queries instantly with AI

## Overview

Query GPT is a modern web application that transforms natural language questions into SQL and NoSQL database queries using advanced language models. The application provides an intuitive interface for generating queries across multiple database systems and offers features like syntax highlighting, schema analysis, and easy query sharing.

## Table of Contents

- [Project Architecture](#project-architecture)
- [Technology Stack](#technology-stack)
- [Core Features](#core-features)
- [Getting Started](#getting-started)
- [Key Components](#key-components)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Project Architecture

```mermaid
graph TD
    A[User Interface] --> B[Query Generator]
    B --> C[AI Model API]
    B --> D[Database Type Selection]
    E[Schema Input] --> B
    F[Query Input] --> B
    B --> G[Generated Query with Syntax Highlighting]
    A --> H[Features Display]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#bfb,stroke:#333,stroke-width:2px
```

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React, TypeScript |
| **Build Tool** | Vite |
| **Styling** | TailwindCSS, Shadcn UI |
| **State Management** | React Hooks, Context API |
| **Data Fetching** | TanStack Query (React Query) |
| **Routing** | React Router |
| **UI Components** | Radix UI, Lucide React icons |
| **Form Handling** | React Hook Form, Zod validation |
| **Developer Tools** | ESLint, TypeScript |

## Core Features

- 🤖 **AI-Powered Query Generation**: Transforms natural language to SQL using advanced LLMs
- 🗄️ **Multi-Database Support**: Generates queries for SQL, MySQL, PostgreSQL, SQL Server, SQLite, and MongoDB
- 🔍 **Schema Analysis**: Interprets database schemas to create accurate queries
- ✨ **Syntax Highlighting**: Displays generated queries with code highlighting
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 🔄 **Preferences Saving**: Remembers your model and language preferences
- 📋 **One-Click Copy**: Easy sharing of generated queries

## Getting Started

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Key Components

| Component | Purpose | File Location |
|-----------|---------|---------------|
| **QueryGenerator** | Core query generation functionality | `src/components/QueryGenerator.tsx` |
| **SchemaInput** | Database schema input interface | `src/components/SchemaInput.tsx` |
| **QueryInput** | Natural language question input | `src/components/QueryInput.tsx` |
| **CodeDisplay** | Syntax highlighted query display | `src/components/CodeDisplay.tsx` |
| **ModelSelector** | AI model and DB type selection | `src/components/ModelSelector.tsx` |
| **Hero** | Main landing section | `src/components/Hero.tsx` |
| **Features** | Feature showcase section | `src/components/Features.tsx` |

## Project Structure

```
query-gpt/
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── ui/              # UI component library (Shadcn)
│   │   ├── QueryGenerator.tsx  # Main query generation component
│   │   └── ...              # Other components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and helpers
│   ├── pages/               # Page components
│   └── App.tsx              # Main application component
├── public/                  # Static assets
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request