import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductCategoryDto) {
    const productCategory = await this.prisma.productCategory.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });

    return {
      code: 201,
      message: 'ProductCategory created successfully',
      data: productCategory,
    };
  }

  async findAll() {
    const productCategories = await this.prisma.productCategory.findMany();

    if (!productCategories) {
      throw new NotFoundException('No productCategories found');
    }

    return {
      code: 200,
      message: 'Get productCategories successfully',
      data: productCategories,
    };
  }

  async findOne(id: number) {
    const productCategory = await this.prisma.productCategory.findUnique({
      where: { id },
    });

    if (!productCategory) {
      throw new NotFoundException(`ProductCategory with id ${id} not found`);
    }

    return {
      code: 200,
      message: 'Get productCategory successfully',
      data: productCategory,
    };
  }

  async update(id: number, data: UpdateProductCategoryDto) {
    const productCategory = await this.prisma.productCategory.update({
      where: { id },
      data,
    });

    return {
      code: 200,
      message: 'ProductCategory updated successfully',
      data: productCategory,
    };
  }

  async remove(id: number) {
    const productCategory = await this.prisma.productCategory.delete({
      where: { id },
    });

    return {
      code: 200,
      message: 'ProductCategory deleted successfully',
      data: productCategory,
    };
  }
}
