# Pharmacy Management Backend

Production-grade backend infrastructure for pharmacy operations, inventory management, authentication workflows, prescription handling, payment processing, and operational reporting.

Built with NestJS, TypeScript, PostgreSQL, Prisma ORM, Docker, Redis, and scalable backend architecture principles.

---

# Features

- JWT Authentication & Refresh Token Flows
- Role-Based Access Control (RBAC)
- Pharmacy Inventory Management
- Prescription & Order Workflows
- Payment Processing Integration
- Redis Caching
- Queue-Based Processing
- Swagger/OpenAPI Documentation
- Dockerized Deployment
- CI/CD Ready Architecture
- Centralized Exception Handling
- Validation Pipelines
- Scalable Modular Backend Architecture

---

# Tech Stack

## Backend

- NestJS
- Node.js
- TypeScript
- Express.js

## Database & ORM

- PostgreSQL
- Prisma ORM

## Infrastructure & DevOps

- Docker
- Redis
- GitHub Actions
- Railway

## Authentication & Security

- JWT Authentication
- Refresh Tokens
- Role-Based Access Control
- Password Hashing

## Documentation & Testing

- Swagger / OpenAPI
- Jest
- Supertest
- Postman

---

# System Architecture

The application follows a modular backend architecture using feature-based module organization and service-layer separation.

Core architectural principles include:

- Modular service organization
- Scalable API design
- Separation of concerns
- DTO validation pipelines
- Centralized exception handling
- Environment-based configuration
- Queue-based asynchronous workflows
- Dockerized deployment workflows

---

# Core Modules

- Authentication Module
- Users Module
- Pharmacy Inventory Module
- Orders Module
- Payments Module
- Notifications Module
- Reporting Module

---

# API Documentation

Swagger/OpenAPI documentation available at:

```bash
/api/docs
```

---

# Authentication Flow

The backend uses JWT-based authentication with:

- Access Tokens
- Refresh Tokens
- Protected Routes
- Role-Based Authorization Guards

---

# Docker Setup

## Build Containers

```bash
docker-compose up --build
```

## Stop Containers

```bash
docker-compose down
```

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
REDIS_HOST=
REDIS_PORT=
PORT=
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/gibsonJESUS1/pharmacy-management-backend.git
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run start:dev
```

---

# Testing

Run unit and API tests:

```bash
npm run test
```

---

# CI/CD

The project is structured for CI/CD workflows using GitHub Actions with automated:

- Dependency installation
- Linting
- Testing
- Build validation

---

# Future Improvements

- Advanced observability & monitoring
- Background job processing
- Notification queues
- Distributed caching
- Microservice extraction
- Kubernetes deployment workflows

---

# Engineering Focus

This project focuses on:

- Scalable backend architecture
- Production-ready API systems
- Backend maintainability
- Service reliability
- Operational workflow automation
- Backend deployment infrastructure

---

# Author

Tosin Owolabi

Backend Engineer focused on scalable APIs, backend architecture, distributed systems, and production engineering workflows.
