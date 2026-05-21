import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  log(
    action: string,

    userId: string,

    metadata?: any,
  ) {
    this.logger.log({
      action,
      userId,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }
}
