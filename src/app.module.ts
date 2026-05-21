import { Module } from "@nestjs/common";

import { APP_GUARD } from "@nestjs/core";

import { CacheModule } from "@nestjs/cache-manager";

import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { LoggerModule } from "nestjs-pino";

import { BullModule } from "@nestjs/bullmq";

import { redisStore } from "cache-manager-redis-store";

import { PrismaModule } from "./infrastructure/prisma/prisma.module";

import { AuthModule } from "./modules/auth/auth.module";

import { ProductsModule } from "./modules/products/products.module";

import { PrescriptionsModule } from "./modules/prescriptions/prescriptions.module";

import { OrdersModule } from "./modules/orders/orders.module";

import { NotificationsModule } from "./modules/notifications/notifications.module";

import { AuditLogService } from "./common/services/audit-log.service";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { HealthModule } from "./modules/health/health.module";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
              }
            : undefined,
      },
    }),
    EventEmitterModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,

      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || "localhost",

            port: Number(process.env.REDIS_PORT) || 6379,
          },
        }),

        ttl: 60000,
      }),
    }),
    CommonModule,
    HealthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || "localhost",

        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),

    PrismaModule,

    AuthModule,

    ProductsModule,

    PrescriptionsModule,

    OrdersModule,

    NotificationsModule,
  ],

  providers: [
    {
      provide: APP_GUARD,

      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
