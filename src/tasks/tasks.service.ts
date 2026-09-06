import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener el listado de tareas',
      );
    }
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    return task;
  }

  async search(q?: string): Promise<Task[]> {
    try {
      if (!q || q.trim() === '') {
        return await this.findAll();
      }
      return await this.taskRepository.find({
        where: {
          title: Like(`%${q.trim()}%`),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar tareas');
    }
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create(dto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la tarea');
    }
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    try {
      Object.assign(task, dto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar la tarea ${id}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    try {
      await this.taskRepository.remove(task);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar la tarea ${id}`,
      );
    }
  }
}