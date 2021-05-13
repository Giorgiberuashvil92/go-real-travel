import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCityComponent } from './inter-city.component';

describe('InterCityComponent', () => {
  let component: InterCityComponent;
  let fixture: ComponentFixture<InterCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
