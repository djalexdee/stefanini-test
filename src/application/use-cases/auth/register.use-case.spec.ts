import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { RegisterUseCase } from './register.use-case';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let repository: jest.Mocked<IUserRepository>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        {
          provide: 'IUserRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = module.get<RegisterUseCase>(RegisterUseCase);
    repository = module.get('IUserRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const expectedUser = new User(
      '1',
      userData.email,
      'hashed_password',
      userData.name,
      new Date(),
      new Date(),
      null,
    );

    repository.findByEmail.mockResolvedValue(null);
    repository.create.mockResolvedValue(expectedUser);

    const result = await useCase.execute(
      userData.email,
      userData.password,
      userData.name,
    );

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email', userData.email);
    expect(result).not.toHaveProperty('password');
    expect(repository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should throw ConflictException when user already exists', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const existingUser = new User(
      '1',
      userData.email,
      'hashed_password',
      userData.name,
      new Date(),
      new Date(),
      null,
    );

    repository.findByEmail.mockResolvedValue(existingUser);

    await expect(
      useCase.execute(userData.email, userData.password, userData.name),
    ).rejects.toThrow(ConflictException);
  });
});

