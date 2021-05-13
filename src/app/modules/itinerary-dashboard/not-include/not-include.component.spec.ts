import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotIncludeComponent } from './not-include.component';

describe('NotIncludeComponent', () => {
  let component: NotIncludeComponent;
  let fixture: ComponentFixture<NotIncludeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotIncludeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotIncludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
