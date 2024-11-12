import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Task } from '../task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnChanges {
  @Input() public task: Task | null = null;
  @Input() public isEditing: boolean = false;
  @Output() public doneEditing: EventEmitter<{ task: Task; isNew: boolean }> =
    new EventEmitter<{
      task: Task;
      isNew: boolean;
    }>();
  @Output() public cancelEditing: EventEmitter<void> = new EventEmitter<void>();

  public submitButtonText: string = 'Create Task';
  public formTitle: string = 'Create Task';
  public attachmentsAsString: string = '';

  ngOnChanges(): void {
    console.log('TaskFormComponent ngOnChanges', this.task);
    console.log('TaskFormComponent ngOnChanges', this.isEditing);
    if (!!this.task) {
      this.attachmentsAsString = this.task?.attachments.join(', ') || '';
    }
    if (this.task) {
      this.taskForm.setValue({
        title: this.task.title || '',
        description: this.task.description || '',
        attachments: this.task.attachments?.join(', ') || '',
      });
    } else {
      this.taskForm.reset({
        title: '',
        description: '',
        attachments: '',
      });
    }
  }
  public taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      attachments: [''],
    });
  }

  public onSubmit(): void {
    this.doneEditing.emit({
      task: {
        id: this.task?.id as string,
        completed: this.task?.completed || false,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        attachments: this.taskForm.value.attachments
          .split(',')
          .map((a: string) => a.trim()),
      },
      isNew: !this.isEditing,
    });
  }

  public onCancel(): void {
    this.cancelEditing.emit();
  }
}
