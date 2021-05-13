import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTransportComponent } from './change-transport.component';

describe('ChangeTransportComponent', () => {
  let component: ChangeTransportComponent;
  let fixture: ComponentFixture<ChangeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
