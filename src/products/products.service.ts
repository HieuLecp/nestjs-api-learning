import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(search?: string, limit = 10, page = 1) {
    const products = await this.prisma.product.findMany({
      where: {
        title: {
          contains: search,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (!products) {
      throw new NotFoundException('No products found');
    }

    return {
      code: 200,
      message: 'Get products successfully',
      products,
    };
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return {
      code: 200,
      message: `Get product with id ${id}`,
      ...product,
    };
  }

  async createProduct(data: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        title: data.title,
        price: data.price,
        category: {
          connect: { id: data.categoryId },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product creation failed');
    }

    return {
      code: 201,
      message: 'Product created successfully',
      data: product,
    };
  }

  async editProduct(id: number, data: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });

    return {
      code: 200,
      message: 'Product updated successfully',
      id,
      data: product,
    };
  }

  async deleteProduct(id: number) {
    await this.prisma.product.delete({
      where: { id },
    });

    return {
      code: 200,
      message: `Product with id ${id} deleted successfully`,
    };
  }
}
