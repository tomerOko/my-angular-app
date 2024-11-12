import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickSendConsoleComponent } from './click-send-console.component';

describe('ClickSendConsoleComponent', () => {
  let component: ClickSendConsoleComponent;
  let fixture: ComponentFixture<ClickSendConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickSendConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickSendConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
