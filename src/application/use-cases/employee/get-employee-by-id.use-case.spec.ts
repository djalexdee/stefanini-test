import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetEmployeeByIdUseCase } from './get-employee-by-id.use-case';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '../../domain/entities/employee.entity';

describe('GetEmployeeByIdUseCase', () => {
  let useCase: GetEmployeeByIdUseCase;
  let repository: jest.Mocked<IEmployeeRepository>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEmployeeByIdUseCase,
        {
          provide: 'IEmployeeRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<GetEmployeeByIdUseCase>(GetEmployeeByIdUseCase);
    repository = module.get('IEmployeeRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an employee by id', async () => {
    const employeeId = '1';
    const expectedEmployee = new Employee(
      employeeId,
      'João Silva',
      30,
      'Desenvolvedor',
      new Date(),
      new Date(),
      null,
    );

    repository.findById.mockResolvedValue(expectedEmployee);

    const result = await useCase.execute(employeeId);

    expect(result).toEqual(expectedEmployee);
    expect(repository.findById).toHaveBeenCalledWith(employeeId);
  });

  it('should throw NotFoundException when employee not found', async () => {
    const employeeId = '1';

    repository.findById.mockResolvedValue(null);

    await expect(useCase.execute(employeeId)).rejects.toThrow(NotFoundException);
    expect(repository.findById).toHaveBeenCalledWith(employeeId);
  });
});

