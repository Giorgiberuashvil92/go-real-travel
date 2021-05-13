import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerTransportComponent } from './partner-transport.component';

describe('PartnerTransportComponent', () => {
  let component: PartnerTransportComponent;
  let fixture: ComponentFixture<PartnerTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
