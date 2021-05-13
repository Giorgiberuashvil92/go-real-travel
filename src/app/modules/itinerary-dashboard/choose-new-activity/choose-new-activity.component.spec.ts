import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNewActivityComponent } from './choose-new-activity.component';

describe('ChooseNewActivityComponent', () => {
  let component: ChooseNewActivityComponent;
  let fixture: ComponentFixture<ChooseNewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNewActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
