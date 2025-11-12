import { Injectable, Inject } from '@nestjs/common';
import { IEmployeeRepository } from '../../../domain/repositories/employee.repository.interface';
import { Employee } from '../../../domain/entities/employee.entity';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(
    name: string,
    age: number,
    role: string,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.create({
      name,
      age,
      role,
    });

    return employee;
  }
}

