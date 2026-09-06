import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

describe('TasksService - findOne', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask: Task = {
    id: 1,
    title: 'Tarea de prueba',
    description: 'Descripción test',
    status: 'pending',
    priority: 'medium',
  };

  const mockRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
    jest.clearAllMocks();
  });

  it('debe retornar una tarea si existe el id', async () => {
    mockRepository.findOneBy.mockResolvedValue(mockTask);

    const result = await service.findOne(1);

    expect(result).toEqual(mockTask);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('debe lanzar NotFoundException si la tarea no existe', async () => {
    mockRepository.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
  });
});