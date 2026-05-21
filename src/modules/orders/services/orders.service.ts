import { BadRequestException, Injectable } from "@nestjs/common";

import { OrderStatus } from "@prisma/client";

import { EventEmitter2 } from "@nestjs/event-emitter";

import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { AuditLogService } from "../../../common/services/audit-log.service";

import { CreateOrderDto } from "../dto/create-order.dto";

import { OrderCreatedEvent } from "../events/order-created.event";

import { OrdersRepository } from "../repositories/orders.repository";

import { NotificationsService } from "../../notifications/services/notifications.service";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly ordersRepository: OrdersRepository,

    private readonly auditLogService: AuditLogService,

    private readonly notificationsService: NotificationsService,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createOrder(
    customerId: string,

    dto: CreateOrderDto,
  ) {
    const order = await this.prisma.$transaction(async (tx) => {
      let totalPrice = 0;

      const orderItems = [];

      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new BadRequestException("Product not found");
        }

        if (!product.isActive) {
          throw new BadRequestException("Product inactive");
        }

        if (product.stockQuantity < item.quantity) {
          throw new BadRequestException("Insufficient stock");
        }

        if (product.prescriptionRequired) {
          const approvedPrescription = await tx.prescription.findFirst({
            where: {
              customerId,

              status: "APPROVED",
            },
          });

          if (!approvedPrescription) {
            throw new BadRequestException(
              `Prescription required for ${product.name}`,
            );
          }
        }

        await tx.product.update({
          where: {
            id: product.id,
          },

          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });

        totalPrice += product.price * item.quantity;

        orderItems.push({
          productId: product.id,

          quantity: item.quantity,

          unitPrice: product.price,
        });
      }

      return tx.order.create({
        data: {
          customerId,

          totalPrice,

          items: {
            create: orderItems,
          },
        },

        include: {
          items: true,
        },
      });
    });

    await this.notificationsService.sendOrderCreatedEmail(
      "customer@email.com",

      order.id,
    );

    this.eventEmitter.emit(
      "order.created",

      new OrderCreatedEvent(
        order.id,

        customerId,

        order.totalPrice,
      ),
    );

    this.auditLogService.log(
      "ORDER_CREATED",

      customerId,

      {
        orderId: order.id,

        totalPrice: order.totalPrice,
      },
    );

    return order;
  }

  myOrders(customerId: string) {
    return this.ordersRepository.findCustomerOrders(customerId);
  }

  findAll() {
    return this.ordersRepository.findAll();
  }

  updateStatus(
    id: string,

    status: OrderStatus,
  ) {
    this.auditLogService.log(
      "ORDER_STATUS_UPDATED",

      "SYSTEM",

      {
        orderId: id,

        status,
      },
    );

    return this.ordersRepository.updateStatus(id, status);
  }
}
