import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { GetUser } from "../../../common/decorators/get-user.decorator";

import { Roles } from "../../../common/decorators/roles.decorator";

import { Role } from "../../../common/enums/role.enum";

import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

import { RolesGuard } from "../../auth/guards/roles.guard";

import { CreateOrderDto } from "../dto/create-order.dto";

import { OrdersService } from "../services/orders.service";
import { Patch, Param } from "@nestjs/common";

import { UpdateOrderStatusDto } from "../dto/update-order-status.dto";

@ApiTags("Orders")
@ApiBearerAuth("access-token")
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Post()
  createOrder(
    @GetUser() user: any,

    @Body()
    body: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(user.userId, body);
  }

  @Roles(Role.CUSTOMER)
  @Get("me")
  myOrders(@GetUser() user: any) {
    return this.ordersService.myOrders(user.userId);
  }
  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Roles(Role.ADMIN, Role.PHARMACIST)
  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,

    @Body()
    body: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
