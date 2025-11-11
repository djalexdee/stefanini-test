import { Injectable, Inject } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '../../domain/entities/employee.entity';

@Injectable()
export class GetAllEmployeesUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }
}

