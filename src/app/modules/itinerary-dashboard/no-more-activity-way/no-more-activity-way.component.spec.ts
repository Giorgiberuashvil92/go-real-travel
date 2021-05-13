import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMoreActivityWayComponent } from './no-more-activity-way.component';

describe('NoMoreActivityWayComponent', () => {
  let component: NoMoreActivityWayComponent;
  let fixture: ComponentFixture<NoMoreActivityWayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoMoreActivityWayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMoreActivityWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
