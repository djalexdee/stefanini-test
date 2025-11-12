import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeUseCase } from './create-employee.use-case';
import { IEmployeeRepository } from '../../../domain/repositories/employee.repository.interface';
import { Employee } from '../../../domain/entities/employee.entity';

describe('CreateEmployeeUseCase', () => {
  let useCase: CreateEmployeeUseCase;
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
        CreateEmployeeUseCase,
        {
          provide: 'IEmployeeRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<CreateEmployeeUseCase>(CreateEmployeeUseCase);
    repository = module.get('IEmployeeRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create an employee', async () => {
    const employeeData = {
      name: 'João Silva',
      age: 30,
      role: 'Desenvolvedor',
    };

    const expectedEmployee = new Employee(
      '1',
      employeeData.name,
      employeeData.age,
      employeeData.role,
      new Date(),
      new Date(),
      null,
    );

    repository.create.mockResolvedValue(expectedEmployee);

    const result = await useCase.execute(
      employeeData.name,
      employeeData.age,
      employeeData.role,
    );

    expect(result).toEqual(expectedEmployee);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: employeeData.name,
        age: employeeData.age,
        role: employeeData.role,
      }),
    );
  });
});

