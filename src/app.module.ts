import { Module } from "@nestjs/common";

import { PrismaModule } from "./infrastructure/prisma/prisma.module";

import { AuthModule } from "./modules/auth/auth.module";

import { ProductsModule } from "./modules/products/products.module";
import { PrescriptionsModule } from "./modules/prescriptions/prescriptions.module";
import { OrdersModule } from "./modules/orders/orders.module";
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProductsModule,
    PrescriptionsModule,
    OrdersModule,
  ],
})
export class AppModule {}
