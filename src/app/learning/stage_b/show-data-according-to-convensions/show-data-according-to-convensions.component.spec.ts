import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataAccordingToConvensionsComponent } from './show-data-according-to-convensions.component';

describe('ShowDataAccordingToConvensionsComponent', () => {
  let component: ShowDataAccordingToConvensionsComponent;
  let fixture: ComponentFixture<ShowDataAccordingToConvensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDataAccordingToConvensionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDataAccordingToConvensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
