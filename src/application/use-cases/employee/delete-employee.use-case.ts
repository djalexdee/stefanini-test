import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IEmployeeRepository } from '../../../domain/repositories/employee.repository.interface';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    await this.employeeRepository.delete(id);
  }
}

