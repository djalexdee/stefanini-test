import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return this.toDomain(created);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!user) {
      return null;
    }

    return this.toDomain(user);
  }

  private toDomain(prismaUser: any): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.name,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.deletedAt,
    );
  }
}

