import { Employee } from '../entities/employee.entity';

export interface IEmployeeRepository {
  create(employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Employee>;
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  update(id: string, employee: Partial<Employee>): Promise<Employee>;
  delete(id: string): Promise<void>;
}

