import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiPropertyOptional({ example: 'João Silva', description: 'Nome do funcionário' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 30, description: 'Idade do funcionário', minimum: 18, maximum: 100 })
  @IsInt()
  @Min(18)
  @Max(100)
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'Desenvolvedor', description: 'Cargo do funcionário' })
  @IsString()
  @IsOptional()
  role?: string;
}

