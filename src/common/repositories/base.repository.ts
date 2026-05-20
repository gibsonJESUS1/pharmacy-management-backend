import { PrismaService } from "../../infrastructure/prisma/prisma.service";

export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismaService) {}
}
