import { Processor, WorkerHost } from "@nestjs/bullmq";

import { Job } from "bullmq";

@Processor("notifications")
export class NotificationsProcessor extends WorkerHost {
  async process(job: Job<any>) {
    switch (job.name) {
      case "order-created":
        console.log("Sending order email:", job.data);

        break;

      default:
        break;
    }
  }
}
