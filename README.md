## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/pharmacy

JWT_SECRET=change_me

JWT_EXPIRES_IN=7d

REDIS_HOST=localhost

REDIS_PORT=6379
```

### Local Development

Start dependencies:

```bash
docker-compose up -d
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run start:dev
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

### Verify Services

```bash
kubectl get svc
```

### Port Forward API

```bash
kubectl port-forward service/pharmacy-api-service 3000:80
```

---

## Database Migrations

Prisma migrations are managed through Kubernetes Jobs.

### Run Migration Job

```bash
kubectl create -f k8s/prisma-migration-job.yaml
```

### Verify Migration Status

```bash
kubectl get jobs
```

```bash
kubectl logs job/<migration-job-name>
```

### Verify Database Tables

```bash
kubectl exec -it <postgres-pod> -- psql -U postgres -d pharmacy
```

```sql
\dt
```

---

## CI/CD Pipeline

The project uses GitHub Actions and GitHub Container Registry (GHCR) for automated image publishing.

### Current Pipeline

```text
Git Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
GHCR Publish
```

### Container Registry

```text
ghcr.io/gibsonjesus1/pharmacy-backend
```

### Future CI/CD Pipeline

```text
Git Push
    ↓
GitHub Actions
    ↓
Docker Build
    ↓
GHCR Publish
    ↓
Prisma Migration Job
    ↓
Kubernetes Deployment
    ↓
Deployment Verification
```

---

## Architecture Diagram

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│    NestJS API    │
└──────┬─────┬─────┘
       │     │
       │     │
       ▼     ▼
┌─────────┐ ┌─────────────┐
│  Redis  │ │ PostgreSQL  │
│  Cache  │ │ Prisma ORM  │
└─────────┘ └─────────────┘

       ▲
       │
 Docker + Kubernetes
       │
 GitHub Actions
       │
      GHCR
```

## Screenshots

### Kubernetes Deployment

Application pods running successfully in Kubernetes.

![Kubernetes Pods](screenshots/k8s-pods.png)

### Kubernetes Services

Service discovery and networking configuration.

![Kubernetes Services](screenshots/k8s-svc.png)

### API Documentation Overview

Swagger documentation showing available API modules.

![Swagger Overview](screenshots/default.png)

### Products & Prescriptions API

Endpoints for product and prescription management.

![Products & Prescriptions](screenshots/product-prescription.png)

### Orders API

Order management endpoints.

![Orders API](screenshots/orders.png)

---

## Production Deployment Lessons Learned

During Kubernetes deployment, the application health checks passed successfully, but business endpoints returned HTTP 500 errors.

### Root Cause

Prisma migrations had not been applied to the PostgreSQL database running inside Kubernetes.

As a result:

- PostgreSQL was reachable
- Prisma could connect successfully
- Health endpoint returned healthy status
- Application tables did not exist

### Symptoms

- GET /health returned 200 OK
- GET /products returned 500 Internal Server Error
- PostgreSQL database contained no tables

### Investigation Process

1. Verified Kubernetes Pods were healthy
2. Verified Redis and PostgreSQL connectivity
3. Verified Prisma database connection
4. Inspected PostgreSQL database directly
5. Discovered no relations existed (`\dt`)
6. Confirmed migration files existed inside the application container
7. Applied migrations manually

### Resolution

```bash
npx prisma migrate deploy
```

### Result

Database tables were created successfully:

- User
- Product
- Prescription
- Order
- OrderItem
- \_prisma_migrations

The application immediately began serving requests successfully.

### Key Learning

Application health checks alone do not guarantee application readiness.

Database schema deployment must be part of the deployment pipeline.

---

## Future Improvements

### Observability

- Prometheus Monitoring
- Grafana Dashboards
- OpenTelemetry Distributed Tracing
- Centralized Log Aggregation

### Platform Engineering

- Helm Charts
- ArgoCD GitOps Deployment
- Kubernetes Ingress Controller
- TLS & Certificate Management
- Multi-Environment Kubernetes Configurations

### Backend Engineering

- BullMQ Background Processing
- Event-Driven Architecture
- API Versioning
- WebSocket Notifications
- Distributed Caching Strategies

### Cloud

- AWS Deployment (EKS)
- Google Cloud Deployment (GKE)
- Azure Kubernetes Service (AKS)
- Managed Database Services

---

## Author

Tosin Owolabi

Backend Engineer | Cloud-Native Backend Development | Infrastructure & Platform Engineering
