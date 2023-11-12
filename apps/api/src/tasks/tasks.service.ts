import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { randomUUID as uuid } from 'crypto';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetFilteredTasksDto } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getFilteredTasks(filterDto: GetFilteredTasksDto) {
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
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    return foundTask;
  }

  deleteTask(id: string) {
    const foundTask = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    return;
  }

  updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const foundTask = this.getTaskById(id);
    const { status } = updateTaskStatusDto;

    const taskToUpdate: Task = { ...foundTask, status };

    this.tasks = this.tasks.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task,
    );

    return taskToUpdate;
  }
}
