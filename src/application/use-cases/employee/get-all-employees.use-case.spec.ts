import { Test, TestingModule } from '@nestjs/testing';
import { GetAllEmployeesUseCase } from './get-all-employees.use-case';
import { IEmployeeRepository } from '../../domain/repositories/employee.repository.interface';
import { Employee } from '../../domain/entities/employee.entity';

describe('GetAllEmployeesUseCase', () => {
  let useCase: GetAllEmployeesUseCase;
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
        GetAllEmployeesUseCase,
        {
          provide: 'IEmployeeRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<GetAllEmployeesUseCase>(GetAllEmployeesUseCase);
    repository = module.get('IEmployeeRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all employees', async () => {
    const expectedEmployees = [
      new Employee('1', 'João Silva', 30, 'Desenvolvedor', new Date(), new Date(), null),
      new Employee('2', 'Maria Santos', 25, 'Designer', new Date(), new Date(), null),
    ];

    repository.findAll.mockResolvedValue(expectedEmployees);

    const result = await useCase.execute();

    expect(result).toEqual(expectedEmployees);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should return empty array when no employees', async () => {
    repository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(repository.findAll).toHaveBeenCalled();
  });
});

