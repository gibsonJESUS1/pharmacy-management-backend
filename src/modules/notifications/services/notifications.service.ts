import { Injectable } from "@nestjs/common";

import { InjectQueue } from "@nestjs/bullmq";

import { Queue } from "bullmq";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue("notifications")
    private notificationsQueue: Queue,
  ) {}

  async sendOrderCreatedEmail(
    email: string,

    orderId: string,
  ) {
    await this.notificationsQueue.add(
      "order-created",

      {
        email,
        orderId,
      },
    );
  }
}
