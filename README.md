# Spur AI Chat Agent

A mini AI-powered customer support chat application built as part of the Spur Founding Full-Stack Engineer take-home assignment.

The application simulates a customer support chat experience where users can interact with an AI support agent. Conversations are persisted, contextual chat history is maintained, and responses are generated using a real LLM.

<!--
## Live Demo

Frontend: TBD

Backend API: TBD
-->



## Features

### Chat Experience

* Real-time chat interface
* User and AI message separation
* Auto-scrolling message list
* Loading state while the AI responds
* Conversation history persistence
* Session-based chat restoration

### AI Support Agent

* Powered by Gemini 2.5 Flash
* Context-aware responses using conversation history
* Domain-specific knowledge for a fictional e-commerce store
* Graceful handling of API failures and rate limits

### Persistence

* Conversations stored in PostgreSQL
* Messages associated with conversations
* Previous chat history restored using conversation IDs

### Reliability

* Input validation using Zod
* Empty message prevention
* Long message handling
* Centralized error handling
* No hardcoded secrets

---

# Tech Stack

## Frontend

* Next.js 15
* TypeScript
* TailwindCSS
* Zustand
* TanStack Query
* Axios

## Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* Zod

## Database

* PostgreSQL (Supabase)

## AI

* Gemini 2.5 Flash

## Infrastructure

* Vercel (Frontend)
* Render (Backend)
* Supabase (Database)

---

# Architecture

The application follows a layered architecture to separate HTTP handling, business logic, persistence, and AI integrations.

```txt
Client
  │
  ▼
Express Routes
  │
  ▼
Controllers
  │
  ▼
Services
  ├── Chat Service
  ├── LLM Service
  └── Cache Service
  │
  ▼
Repositories
  │
  ▼
PostgreSQL
```

## Backend Structure

```txt
backend/
├── prisma/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── types/
│   ├── app.ts
│   └── server.ts
```

---

# Database Schema

## Conversation

| Field     | Type     |
| --------- | -------- |
| id        | String   |
| createdAt | DateTime |

## Message

| Field          | Type      |
| -------------- | --------- |
| id             | String    |
| conversationId | String    |
| sender         | user / ai |
| text           | String    |
| createdAt      | DateTime  |

---

# LLM Design

The AI layer is abstracted behind a service boundary to allow future support for additional providers.

Current provider:

* Gemini 2.5 Flash

Potential future providers:

* OpenAI
* Anthropic Claude
* Self-hosted models

### System Prompt

The AI is configured as a customer support representative for a fictional e-commerce business.

The prompt includes:

* Shipping policy
* Refund policy
* Support hours
* Conversation history

This helps ensure consistent and domain-aware responses.

---

# Environment Variables

## Backend

```env
PORT=5000

DATABASE_URL=

GEMINI_API_KEY=

REDIS_URL=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# Local Development

## 1. Clone Repository

```bash
git clone <repo-url>
cd spur-ai-chat-agent
```

## 2. Install Backend Dependencies

```bash
cd backend
bun install
```

## 3. Configure Environment Variables

Create:

```txt
backend/.env
```

and add the required values.

## 4. Run Database Migrations

```bash
bunx prisma migrate dev
```

## 5. Start Backend

```bash
bun run dev
```

## 6. Install Frontend Dependencies

```bash
cd ../frontend
bun install
```

## 7. Configure Frontend Environment Variables

Create:

```txt
frontend/.env.local
```

## 8. Start Frontend

```bash
bun run dev
```

---

# API

## Send Message

### Request

```http
POST /chat/message
```

```json
{
  "message": "What is your refund policy?",
  "sessionId": "optional-session-id"
}
```

### Response

```json
{
  "reply": "We offer a 30-day refund policy.",
  "sessionId": "conversation-id"
}
```

---

# Design Decisions

### Prisma + PostgreSQL

Chosen for type safety, migrations, and ease of deployment.

### Layered Architecture

Separates routing, business logic, persistence, and external integrations to improve maintainability and extensibility.

### LLM Service Abstraction

Keeps AI provider logic isolated from business logic, making it easier to swap providers in the future.

### Redis Caching

Conversation history may be cached in Redis to reduce repeated database queries while PostgreSQL remains the source of truth.

---

# Future Improvements

If given more time, I would add:

* Streaming AI responses
* Message regeneration
* Multi-conversation management UI
* Authentication
* Rate limiting
* Unit and integration tests
* Analytics and conversation insights
* Support for multiple LLM providers
* Channel integrations (WhatsApp, Instagram, Live Chat)

---

# Trade-offs

To keep the scope aligned with the assignment:

* Authentication was omitted
* Third-party integrations were omitted
* Streaming responses were deferred
* Focus was placed on clean architecture, reliability, and maintainability

---

# Author

Adarsh Verma
