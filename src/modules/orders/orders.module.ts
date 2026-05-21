import { Module } from "@nestjs/common";

import { OrdersController } from "./controllers/orders.controller";

import { OrdersRepository } from "./repositories/orders.repository";

import { OrdersService } from "./services/orders.service";
import { OrderCreatedListener } from "./listeners/order-created.listener";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [NotificationsModule],

  controllers: [OrdersController],

  providers: [OrdersService, OrdersRepository, OrderCreatedListener],

  exports: [OrdersService],
})
export class OrdersModule {}
