import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '../../domain/entities/employee.entity';

@Injectable()
export class GetEmployeeByIdUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }
}

