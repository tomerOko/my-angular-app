import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-prime-form',
  templateUrl: './task-prime-form.component.html',
  styleUrl: './task-prime-form.component.scss',
})
export class TaskPrimeFormComponent implements OnChanges {
  @Input() task!: Task;
  @Output() cancelEditing: EventEmitter<void> = new EventEmitter<void>();
  @Output() public doneEditing: EventEmitter<{ task: Task; isNew: boolean }> =
    new EventEmitter<{
      task: Task;
      isNew: boolean;
    }>();

  public attachmentsAsString: string = '';
  public isEditing: boolean | null = null;

  public ngOnChanges(): void {
    this.attachmentsAsString = this.task.attachments.join(', ');
    if (this.isEditing === null) {
      this.isEditing = this.task.title !== '';
    }
  }

  public onSubmit(): void {
    this.task.attachments = this.attachmentsAsString
      .split(',')
      .map((a) => a.trim());
    this.doneEditing.emit({
      isNew: !this.isEditing,
      task: this.task,
    });
  }

  public onCancel(): void {
    this.cancelEditing.emit();
  }
}
