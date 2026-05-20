import { Module } from "@nestjs/common";

import { OrdersController } from "./controllers/orders.controller";

import { OrdersRepository } from "./repositories/orders.repository";

import { OrdersService } from "./services/orders.service";

@Module({
  controllers: [OrdersController],

  providers: [OrdersService, OrdersRepository],

  exports: [OrdersService],
})
export class OrdersModule {}
