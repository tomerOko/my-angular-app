import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataBestPracticesComponent } from './show-data-best-practices.component';

describe('ShowDataBestPracticesComponent', () => {
  let component: ShowDataBestPracticesComponent;
  let fixture: ComponentFixture<ShowDataBestPracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDataBestPracticesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDataBestPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
