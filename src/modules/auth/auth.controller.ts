import { Body, Controller, Post, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

import { JwtAuthGuard } from "./guards/jwt-auth.guard";

import { GetUser } from "../../common/decorators/get-user.decorator";

import { Roles } from "../../common/decorators/roles.decorator";

import { RolesGuard } from "./guards/roles.guard";

import { Role } from "../../common/enums/role.enum";
import { Throttle } from "@nestjs/throttler";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Throttle({
    default: {
      limit: 5,
      ttl: 60000,
    },
  })
  @Post("login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async profile(@GetUser() user: any) {
    return this.authService.profile(user.userId);
  }
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("admin")
  adminRoute() {
    return {
      message: "Admin access granted",
    };
  }
}
