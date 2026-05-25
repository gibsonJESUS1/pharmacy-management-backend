# =========================
# BUILD STAGE
# =========================

FROM node:20-bullseye AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# =========================
# PRODUCTION STAGE
# =========================

FROM node:20-bullseye

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/main"]