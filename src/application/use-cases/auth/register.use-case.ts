import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    name: string,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

