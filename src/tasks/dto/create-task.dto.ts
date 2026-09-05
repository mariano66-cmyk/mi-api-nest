import { IsNotEmpty, IsString, MaxLength, IsIn, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío' })
  @MaxLength(50, { message: 'El título no puede tener más de 50 caracteres' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'La prioridad no puede estar vacía' })
  @IsIn(['low', 'medium', 'high'], {
    message: 'La prioridad debe ser low, medium o high',
  })
  priority: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  description: string;

  @IsOptional()
  @IsIn(['pending', 'in_progress', 'done'], {
    message: 'El status debe ser pending, in_progress o done',
  })
  status?: string;
}