import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // O token será gerado no AuthService
    return { access_token: 'token_placeholder' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }
}

