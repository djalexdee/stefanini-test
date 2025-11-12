import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '../../domain/entities/employee.entity';

@Injectable()
export class PrismaEmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Employee> {
    const created = await this.prisma.employee.create({
      data: {
        name: employee.name,
        age: employee.age,
        role: employee.role,
      },
    });

    return this.toDomain(created);
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
    });

    return employees.map(this.toDomain);
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!employee) {
      return null;
    }

    return this.toDomain(employee);
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    const updateData: any = {};

    if (employee.name !== undefined) {
      updateData.name = employee.name;
    }
    if (employee.age !== undefined) {
      updateData.age = employee.age;
    }
    if (employee.role !== undefined) {
      updateData.role = employee.role;
    }

    const updated = await this.prisma.employee.update({
      where: { id },
      data: updateData,
    });

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    // Soft delete
    await this.prisma.employee.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  private toDomain(prismaEmployee: any): Employee {
    return new Employee(
      prismaEmployee.id,
      prismaEmployee.name,
      prismaEmployee.age,
      prismaEmployee.role,
      prismaEmployee.createdAt,
      prismaEmployee.updatedAt,
      prismaEmployee.deletedAt,
    );
  }
}

