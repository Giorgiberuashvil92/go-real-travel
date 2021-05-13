import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckExperienceComponent } from './check-experience.component';

describe('CheckExperienceComponent', () => {
  let component: CheckExperienceComponent;
  let fixture: ComponentFixture<CheckExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
