import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import { OrderStatus } from "@prisma/client";

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOrder(data: any) {
    return this.prisma.order.create({
      data,

      include: {
        items: true,
      },
    });
  }

  findCustomerOrders(customerId: string) {
    return this.prisma.order.findMany({
      where: {
        customerId,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
  findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },

        customer: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
  updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });
  }
}
