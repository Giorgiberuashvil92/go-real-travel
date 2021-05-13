import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPaginatorComponent } from './location-paginator.component';

describe('LocationPaginatorComponent', () => {
  let component: LocationPaginatorComponent;
  let fixture: ComponentFixture<LocationPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
