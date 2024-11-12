import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskPrimeFormComponent } from './task-prime-form/task-prime-form.component';
import { FormsModule } from '@angular/forms';

// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    TaskFormComponent,
    TasksListComponent,
    TaskCardComponent,
    TaskPrimeFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    RouterModule.forChild([
      { path: '', component: TasksListComponent },
      { path: ':id', component: TaskCardComponent },
    ]),
  ],
})
export class TasksModule {}
