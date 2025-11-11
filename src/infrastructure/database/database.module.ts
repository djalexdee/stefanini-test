import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaEmployeeRepository } from '../repositories/prisma-employee.repository';
import { PrismaUserRepository } from '../repositories/prisma-user.repository';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'IEmployeeRepository',
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    'IEmployeeRepository',
    'IUserRepository',
  ],
})
export class DatabaseModule {}

