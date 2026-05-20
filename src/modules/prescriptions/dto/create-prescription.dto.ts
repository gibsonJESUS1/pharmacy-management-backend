import { IsOptional, IsString } from "class-validator";

export class CreatePrescriptionDto {
  @IsString()
  fileName: string;

  @IsString()
  fileUrl: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
