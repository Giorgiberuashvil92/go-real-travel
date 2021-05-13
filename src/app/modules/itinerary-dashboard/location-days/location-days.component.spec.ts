import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDaysComponent } from './location-days.component';

describe('LocationDaysComponent', () => {
  let component: LocationDaysComponent;
  let fixture: ComponentFixture<LocationDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
