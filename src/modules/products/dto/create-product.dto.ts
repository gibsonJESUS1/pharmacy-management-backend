import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @IsBoolean()
  prescriptionRequired: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
