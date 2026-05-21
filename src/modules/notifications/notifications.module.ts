import { Module } from "@nestjs/common";

import { BullModule } from "@nestjs/bullmq";

import { NotificationsProcessor } from "./processors/notifications.processor";

import { NotificationsService } from "./services/notifications.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "notifications",
    }),
  ],

  providers: [NotificationsService, NotificationsProcessor],

  exports: [NotificationsService],
})
export class NotificationsModule {}
