import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomUUID as uuid } from 'crypto';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === filterDto.status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return foundTask;
  }

  deleteTask(id: string) {
    const foundTaskIndex = this.tasks.findIndex((task) => task.id === id);

    if (foundTaskIndex === -1) {
      throw new BadRequestException(`Task with ID ${id} could not be deleted`);
    }

    this.tasks.splice(foundTaskIndex, 1);
    return;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const foundTask = this.getTaskById(id);

    const taskToUpdate: Task = { ...foundTask, status };

    this.tasks = this.tasks.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task,
    );

    return taskToUpdate;
  }
}
