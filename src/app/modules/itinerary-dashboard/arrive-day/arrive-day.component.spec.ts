import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriveDayComponent } from './arrive-day.component';

describe('ArriveDayComponent', () => {
  let component: ArriveDayComponent;
  let fixture: ComponentFixture<ArriveDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriveDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriveDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
