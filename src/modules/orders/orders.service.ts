import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  14;
  async createOrder(userId: string, body: any) {
    let total = 0;
    for (const item of body.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        throw new BadRequestException("Product not found");
      }
      if (product.stockQuantity < item.quantity) {
        throw new BadRequestException("Insufficient stock");
      }
      total += product.price * item.quantity;
      await this.prisma.product.update({
        where: { id: product.id },
        data: {
          stockQuantity: product.stockQuantity - item.quantity,
        },
      });
    }
    return this.prisma.order.create({
      data: {
        userId,
        totalAmount: total,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });
  }
}
