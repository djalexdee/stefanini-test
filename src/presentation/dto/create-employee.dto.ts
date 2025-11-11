import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do funcionário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 30, description: 'Idade do funcionário', minimum: 18, maximum: 100 })
  @IsInt()
  @Min(18)
  @Max(100)
  age: number;

  @ApiProperty({ example: 'Desenvolvedor', description: 'Cargo do funcionário' })
  @IsString()
  @IsNotEmpty()
  role: string;
}

