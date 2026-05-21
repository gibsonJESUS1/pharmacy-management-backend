import { Controller, Get } from "@nestjs/common";

import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from "@nestjs/terminus";

import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,

    private memory: MemoryHealthIndicator,

    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.health.check([
      async () =>
        this.memory.checkHeap(
          "memory_heap",

          300 * 1024 * 1024,
        ),

      async () => {
        await this.prisma.$queryRaw`SELECT 1`;

        return {
          database: {
            status: "up",
          },
        };
      },
    ]);
  }
}
