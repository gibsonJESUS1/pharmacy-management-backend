# Cloud-Native Pharmacy Backend

A scalable cloud-native pharmacy backend built with NestJS, Prisma, PostgreSQL, Redis, Docker, and Kubernetes.

---

## Overview

This project is a production-oriented backend system designed for managing pharmacy operations such as:

- User Authentication & Authorization
- Product Management
- Prescription Processing
- Order Management
- Inventory Handling
- Health Monitoring
- Infrastructure Scaling

The system was designed with backend engineering, cloud-native deployment, and infrastructure reliability in mind.

---

## Tech Stack

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis

### Infrastructure
- Docker
- Kubernetes
- Horizontal Pod Autoscaling (HPA)

### Authentication & Security
- JWT Authentication
- Role-Based Access Control (RBAC)
- Request Throttling

### Documentation & Monitoring
- Swagger API Documentation
- Health Checks
- Structured Logging

---

## Features

- JWT Authentication & Authorization
- Role-Based Access Control (RBAC)
- Product CRUD Management
- Prescription Approval Workflow
- Order Creation & Status Management
- Redis Caching
- Structured Logging with Pino
- Health Monitoring with Terminus
- Kubernetes Deployments
- ConfigMaps & Secrets
- Horizontal Scaling with HPA
- Docker Multi-Stage Builds
- Production Readiness & Liveness Probes

---

## Architecture

### Application Layer
- Modular NestJS Architecture
- DTO Validation
- Service & Repository Pattern

### Data Layer
- PostgreSQL Database
- Prisma ORM
- Redis Cache Layer

### Infrastructure Layer
- Dockerized Services
- Kubernetes Deployments
- Kubernetes Services
- ConfigMaps
- Secrets
- Health Probes
- Horizontal Scaling

---

## Project Structure

```bash
src/
├── common/
├── infrastructure/
├── modules/
│   ├── auth/
│   ├── products/
│   ├── orders/
│   ├── prescriptions/
│   └── health/

k8s/
├── app-deployment.yaml
├── app-service.yaml
├── postgres-deployment.yaml
├── postgres-service.yaml
├── redis-deployment.yaml
├── redis-service.yaml
├── configmap.yaml
├── secret.yaml
└── hpa.yaml
```

---

## Local Development

### Install Dependencies

```bash
npm install
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run start:dev
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pharmacy
JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Docker

### Build Docker Image

```bash
docker build -t pharmacy-backend .
```

### Run Container

```bash
docker run -p 3000:3000 pharmacy-backend
```

---

## Kubernetes Deployment

### Apply Kubernetes Resources

```bash
kubectl apply -f k8s/
```

### Verify Pods

```bash
kubectl get pods
```

### Port Forward Service

```bash
kubectl port-forward service/pharmacy-api-service 3000:80
```

---

## Health Monitoring

The application includes production-grade health checks using NestJS Terminus.

### Health Features
- Readiness Probes
- Liveness Probes
- Database Connectivity Checks
- Memory Heap Monitoring

### Health Endpoint

```bash
GET /health
```

---

## Swagger API Documentation

After starting the application:

```bash
http://localhost:3000/docs
```

---

## Scaling

Horizontal Pod Autoscaling (HPA) is configured for the API deployment.

### Scaling Features
- CPU-Based Scaling
- Automatic Replica Management
- Kubernetes Load Distribution

---

## Security

- JWT Authentication
- Role-Based Authorization
- Secret Management with Kubernetes Secrets
- Request Throttling
- Health Endpoint Throttle Exclusion

---

## Logging

Structured logging implemented using:

- nestjs-pino
- Request Logging
- Error Tracking
- HTTP Request Monitoring

---

## Future Improvements

- CI/CD Pipeline with GitHub Actions
- Docker Registry Integration
- Automated Kubernetes Deployments
- Prometheus & Grafana Monitoring
- BullMQ Queue Processing
- Helm Charts
- API Versioning
- Distributed Tracing
- Cloud Deployment (AWS/GCP/Azure)

---

## Lessons & Engineering Focus

This project focuses heavily on:

- Backend Engineering
- Infrastructure Engineering
- Cloud-Native Architecture
- Containerization
- Deployment Automation
- Runtime Debugging
- Kubernetes Operations
- Production Readiness

---

## Author

Tosin Owolabi

Backend Engineer | Cloud-Native Backend Development | Infrastructure & Platform Engineering