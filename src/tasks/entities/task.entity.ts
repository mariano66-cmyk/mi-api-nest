import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('tasks')
export class Task {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Aprender NestJS' })
  @Column()
  title: string;

  @ApiPropertyOptional({ example: 'Completar el módulo 6' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'pending', default: 'pending' })
  @Column({ default: 'pending' })
  status: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}