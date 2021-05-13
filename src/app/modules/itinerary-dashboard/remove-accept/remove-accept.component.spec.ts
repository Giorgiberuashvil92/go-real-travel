import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAcceptComponent } from './remove-accept.component';

describe('RemoveAcceptComponent', () => {
  let component: RemoveAcceptComponent;
  let fixture: ComponentFixture<RemoveAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
