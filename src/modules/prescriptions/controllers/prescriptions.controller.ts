import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { GetUser } from "../../../common/decorators/get-user.decorator";

import { Roles } from "../../../common/decorators/roles.decorator";

import { Role } from "../../../common/enums/role.enum";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

import { RolesGuard } from "../../auth/guards/roles.guard";

import { CreatePrescriptionDto } from "../dto/create-prescription.dto";

import { ReviewPrescriptionDto } from "../dto/review-prescription.dto";

import { PrescriptionsService } from "../services/prescriptions.service";

@ApiTags("Prescriptions")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles(Role.CUSTOMER, Role.ADMIN, Role.PHARMACIST)
  @Post()
  create(
    @GetUser() user: any,

    @Body()
    body: CreatePrescriptionDto,
  ) {
    return this.prescriptionsService.create(user.userId, body);
  }

  @Roles(Role.CUSTOMER)
  @Get("me")
  myPrescriptions(@GetUser() user: any) {
    return this.prescriptionsService.myPrescriptions(user.userId);
  }

  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Patch(":id/review")
  review(
    @Param("id") id: string,

    @GetUser() user: any,

    @Body()
    body: ReviewPrescriptionDto,
  ) {
    return this.prescriptionsService.review(id, user.userId, body);
  }
}
