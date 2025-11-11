import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { CreateEmployeeUseCase } from './use-cases/employee/create-employee.use-case';
import { GetAllEmployeesUseCase } from './use-cases/employee/get-all-employees.use-case';
import { GetEmployeeByIdUseCase } from './use-cases/employee/get-employee-by-id.use-case';
import { UpdateEmployeeUseCase } from './use-cases/employee/update-employee.use-case';
import { DeleteEmployeeUseCase } from './use-cases/employee/delete-employee.use-case';
import { RegisterUseCase } from './use-cases/auth/register.use-case';
import { LoginUseCase } from './use-cases/auth/login.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateEmployeeUseCase,
    GetAllEmployeesUseCase,
    GetEmployeeByIdUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    RegisterUseCase,
    LoginUseCase,
  ],
  exports: [
    CreateEmployeeUseCase,
    GetAllEmployeesUseCase,
    GetEmployeeByIdUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    RegisterUseCase,
    LoginUseCase,
  ],
})
export class ApplicationModule {}

