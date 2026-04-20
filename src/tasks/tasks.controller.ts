import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() { return this.tasksService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.tasksService.findOne(+id); }

  @Post()
  create(@Body() task: Partial<Task>) { return this.tasksService.create(task); }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>) {
    return this.tasksService.update(+id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.remove(+id); }
}