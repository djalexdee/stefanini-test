import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateEmployeeUseCase } from '../../application/use-cases/employee/create-employee.use-case';
import { GetAllEmployeesUseCase } from '../../application/use-cases/employee/get-all-employees.use-case';
import { GetEmployeeByIdUseCase } from '../../application/use-cases/employee/get-employee-by-id.use-case';
import { UpdateEmployeeUseCase } from '../../application/use-cases/employee/update-employee.use-case';
import { DeleteEmployeeUseCase } from '../../application/use-cases/employee/delete-employee.use-case';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('employees')
@Controller('employees')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly getAllEmployeesUseCase: GetAllEmployeesUseCase,
    private readonly getEmployeeByIdUseCase: GetEmployeeByIdUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.createEmployeeUseCase.execute(
      createEmployeeDto.name,
      createEmployeeDto.age,
      createEmployeeDto.role,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários' })
  async findAll() {
    return this.getAllEmployeesUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.getEmployeeByIdUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.updateEmployeeUseCase.execute(
      id,
      updateEmployeeDto.name,
      updateEmployeeDto.age,
      updateEmployeeDto.role,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar funcionário (soft delete)' })
  @ApiResponse({ status: 204, description: 'Funcionário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado' })
  async remove(@Param('id') id: string) {
    return this.deleteEmployeeUseCase.execute(id);
  }
}

