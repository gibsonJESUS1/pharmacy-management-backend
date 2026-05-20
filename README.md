# Pharmacy Backend API

A scalable pharmacy backend system built with NestJS, Prisma, and PostgreSQL.

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- Product Management
- Prescription Workflow
- Swagger API Documentation
- Prisma ORM
- PostgreSQL
- Docker Support
- Repository Pattern Architecture

## Roles

- CUSTOMER
- PHARMACIST
- ADMIN

## Tech Stack

- NestJS
- Prisma
- PostgreSQL
- JWT
- Swagger
- Docker

## Setup

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pharmacy
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
```

Run migration:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run start:dev
```

Swagger Docs:

```text
http://localhost:3000/docs
```

## Architecture

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

## Upcoming Infrastructure Evolution

- Redis Caching
- BullMQ Queues
- Event-Driven Architecture
- Observability
- CI/CD
- Kubernetes
- Distributed Systems Patterns
