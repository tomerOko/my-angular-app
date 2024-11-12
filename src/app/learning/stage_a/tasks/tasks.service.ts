import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  public tasks: Task[] = [
    {
      id: uuid(),
      title: 'Task 1',
      description: 'Description for task 1',
      attachments: [],
      completed: false,
    },
    {
      id: uuid(),
      title: 'Task 2',
      description: 'Description for task 2',
      attachments: [],
      completed: true,
    },
    {
      id: uuid(),
      title: 'Task 3',
      description: 'Description for task 3',
      attachments: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/151',
      ],
      completed: false,
    },
  ];
}
