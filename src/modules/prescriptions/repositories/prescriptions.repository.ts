import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

import { PrescriptionStatus } from "../enums/prescription-status.enum";

@Injectable()
export class PrescriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.prescription.create({
      data,
    });
  }

  findByCustomer(customerId: string) {
    return this.prisma.prescription.findMany({
      where: {
        customerId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findAll() {
    return this.prisma.prescription.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findOne(id: string) {
    return this.prisma.prescription.findUnique({
      where: { id },
    });
  }

  review(
    id: string,
    pharmacistId: string,
    status: PrescriptionStatus,
    notes?: string,
  ) {
    return this.prisma.prescription.update({
      where: {
        id,
      },

      data: {
        status,
        notes,
        reviewedBy: pharmacistId,
        reviewedAt: new Date(),
      },
    });
  }
}
