import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    this.taskRepository.merge(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  async getStats(): Promise<{ pending: number; in_progress: number; done: number }> {
    try {
      const [pending, in_progress, done] = await Promise.all([
        this.taskRepository.count({ where: { status: 'pending' as any } }),
        this.taskRepository.count({ where: { status: 'in_progress' as any } }),
        this.taskRepository.count({ where: { status: 'done' as any } }),
      ]);

      return { pending, in_progress, done };
    } catch {
      throw new InternalServerErrorException('Error al obtener las estadísticas de tareas');
    }
  }
}