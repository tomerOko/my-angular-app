import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataWithRxjsComponent } from './show-data-with-rxjs.component';

describe('ShowDataWithRxjsComponent', () => {
  let component: ShowDataWithRxjsComponent;
  let fixture: ComponentFixture<ShowDataWithRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDataWithRxjsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDataWithRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
