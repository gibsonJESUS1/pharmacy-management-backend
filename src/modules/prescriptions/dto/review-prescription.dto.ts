import { IsEnum, IsOptional, IsString } from "class-validator";

import { PrescriptionStatus } from "../enums/prescription-status.enum";

export class ReviewPrescriptionDto {
  @IsEnum(PrescriptionStatus)
  status: PrescriptionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
