import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApplicationModule } from '../application/application.module';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { EmployeeController } from './controllers/employee.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthPublicGuard } from './guards/jwt-auth-public.guard';

@Module({
  imports: [
    ApplicationModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [EmployeeController, AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, JwtAuthPublicGuard],
  exports: [AuthService],
})
export class PresentationModule {}

