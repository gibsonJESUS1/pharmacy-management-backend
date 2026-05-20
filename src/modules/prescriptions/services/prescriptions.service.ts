import { Injectable, NotFoundException } from "@nestjs/common";

import { CreatePrescriptionDto } from "../dto/create-prescription.dto";

import { ReviewPrescriptionDto } from "../dto/review-prescription.dto";

import { PrescriptionsRepository } from "../repositories/prescriptions.repository";

@Injectable()
export class PrescriptionsService {
  constructor(
    private readonly prescriptionsRepository: PrescriptionsRepository,
  ) {}

  create(customerId: string, data: CreatePrescriptionDto) {
    return this.prescriptionsRepository.create({
      ...data,
      customerId,
    });
  }

  myPrescriptions(customerId: string) {
    return this.prescriptionsRepository.findByCustomer(customerId);
  }

  async review(id: string, pharmacistId: string, data: ReviewPrescriptionDto) {
    const prescription = await this.prescriptionsRepository.findOne(id);

    if (!prescription) {
      throw new NotFoundException("Prescription not found");
    }

    return this.prescriptionsRepository.review(
      id,
      pharmacistId,
      data.status,
      data.notes,
    );
  }

  findAll() {
    return this.prescriptionsRepository.findAll();
  }
}
