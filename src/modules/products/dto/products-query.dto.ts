import { IsBooleanString, IsEnum, IsOptional, IsString } from "class-validator";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";

import { SortOrder } from "../../../common/enums/sort-order.enum";

export class ProductsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBooleanString()
  prescriptionRequired?: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @ApiPropertyOptional({
    example: "price",
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    enum: SortOrder,
    example: SortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;
}
