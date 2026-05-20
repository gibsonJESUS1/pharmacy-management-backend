import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Query,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { Role } from "../../../common/enums/role.enum";

import { Roles } from "../../../common/decorators/roles.decorator";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

import { RolesGuard } from "../../auth/guards/roles.guard";

import { CreateProductDto } from "../dto/create-product.dto";

import { UpdateProductDto } from "../dto/update-product.dto";

import { ProductsService } from "../services/products.service";

import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto";
import { ProductsQueryDto } from "../dto/products-query.dto";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query()
    query: ProductsQueryDto,
  ) {
    return this.productsService.findAll(query);
  }
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Patch(":id")
  update(
    @Param("id") id: string,

    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.update(id, body);
  }

  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
