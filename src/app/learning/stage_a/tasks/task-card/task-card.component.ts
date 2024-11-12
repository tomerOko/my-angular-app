import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnChanges {
  @Input('task') public task!: Task;

  @Output() private readonly editTaskEvent = new EventEmitter<Task>();
  @Output() private readonly deleteTaskEvent = new EventEmitter<Task>();

  public attachmentsLength = 0;

  ngOnChanges(): void {
    if (this.task?.attachments) {
      this.attachmentsLength = this.task.attachments.length;
    }
  }

  public toggleCompleted(): void {
    this.task.completed = !this.task.completed;
  }

  public startEditTask(): void {
    this.editTaskEvent.emit(this.task);
  }

  public deleteTask(): void {
    this.deleteTaskEvent.emit(this.task);
  }
}
