import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(task: Partial<Task>): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    await this.tasksRepository.update(id, task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}