import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea', example: 'Aprender NestJS' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Descripción detallada', example: 'Completar el módulo 6' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Estado: pending | in_progress | done', example: 'pending', default: 'pending' })
  @IsString()
  @IsOptional()
  status?: string;
}