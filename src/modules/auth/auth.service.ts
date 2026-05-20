import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { PrismaService } from "../../infrastructure/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashed,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException();
    }

    return {
      access_token: accessToken,

      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
  async profile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
