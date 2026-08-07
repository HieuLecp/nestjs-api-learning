import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
    return {
      code: 201,
      message: 'User created successfully',
      user,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    if (!users) {
      throw new Error('No users found');
    }

    return {
      code: 200,
      message: 'Get users successfully',
      users,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return {
      code: 200,
      message: `Get user with id ${id}`,
      user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
      },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return {
      code: 200,
      message: `User with id ${id} updated successfully`,
      user,
    };
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return {
      code: 200,
      message: `User with id ${id} removed successfully`,
      user,
    };
  }
}
