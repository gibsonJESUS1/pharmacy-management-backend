import { Module } from "@nestjs/common";

import { PrescriptionsController } from "./controllers/prescriptions.controller";

import { PrescriptionsRepository } from "./repositories/prescriptions.repository";

import { PrescriptionsService } from "./services/prescriptions.service";

@Module({
  controllers: [PrescriptionsController],

  providers: [PrescriptionsService, PrescriptionsRepository],

  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
