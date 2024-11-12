import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../task.model';
import { v4 as uuid } from 'uuid';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
})
export class TasksListComponent {
  constructor(public taskService: TasksService) {}

  public currentTask: Task | null = null;

  public startEditTask(task: Task): void {
    this.currentTask = task;
  }

  public doneEditing(data: { task: Task; isNew: boolean }): void {
    const task = data.task;
    if (data.isNew) {
      this.taskService.tasks.push(task);
    } else {
      this.taskService.tasks = this.taskService.tasks.map((t) =>
        t.id === task.id ? task : t
      );
    }
    this.currentTask = null;
  }

  public cancelEditing(): void {
    this.currentTask = null;
  }

  public deleteTask(task: Task): void {
    this.taskService.tasks = this.taskService.tasks.filter(
      (t) => t.id !== task.id
    );
  }

  public addNewTask(): void {
    this.currentTask = {
      id: uuid(),
      title: '',
      description: '',
      attachments: [],
      completed: false,
    };
  }

  public trackById(index: number, item: any): number {
    return item.id;
  }
}
