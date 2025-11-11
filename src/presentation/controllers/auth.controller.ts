import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterUseCase } from '../../application/use-cases/auth/register.use-case';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { JwtAuthPublicGuard } from '../guards/jwt-auth-public.guard';

@ApiTags('auth')
@Controller('auth')
@UseGuards(JwtAuthPublicGuard)
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Usuário já existe' })
  async register(@Body() registerDto: RegisterDto) {
    return this.registerUseCase.execute(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fazer login' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}

