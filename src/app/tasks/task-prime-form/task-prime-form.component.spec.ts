import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPrimeFormComponent } from './task-prime-form.component';

describe('TaskPrimeFormComponent', () => {
  let component: TaskPrimeFormComponent;
  let fixture: ComponentFixture<TaskPrimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskPrimeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPrimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
