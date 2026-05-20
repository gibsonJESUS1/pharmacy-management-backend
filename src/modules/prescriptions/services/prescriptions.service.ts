import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
@Injectable()
export class PrescriptionsService {
  constructor(private prisma: PrismaService) {}
  upload(data: any) {
    return this.prisma.prescription.create({
      data,
    });
  }
  review(id: string, data: any) {
    return this.prisma.prescription.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes,
        reviewedAt: new Date(),
      },
    });
  }
}
