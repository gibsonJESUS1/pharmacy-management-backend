import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { CreateProductDto } from "../dto/create-product.dto";

import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  // findAll(query: any) {
  //   const { page, limit, prescriptionRequired, isActive, sort, order } = query;

  //   return this.prisma.product.findMany({
  //     skip: (page - 1) * limit,

  //     take: limit,

  //     where: {
  //       ...(prescriptionRequired !== undefined
  //         ? {
  //             prescriptionRequired: prescriptionRequired === "true",
  //           }
  //         : {}),

  //       ...(isActive !== undefined
  //         ? {
  //             isActive: isActive === "true",
  //           }
  //         : {}),
  //     },

  //     orderBy: sort
  //       ? {
  //           [sort]: order || "desc",
  //         }
  //       : {
  //           createdAt: "desc",
  //         },
  //   });
  // }
  findAll() {
    return this.prisma.product.findMany();
  }
  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
