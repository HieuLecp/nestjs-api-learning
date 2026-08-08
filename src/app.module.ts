import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, PrismaModule, UsersModule, ProductCategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
