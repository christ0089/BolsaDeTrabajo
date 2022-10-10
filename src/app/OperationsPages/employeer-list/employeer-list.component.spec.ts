import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerListComponent } from './employeer-list.component';

describe('EmployeerListComponent', () => {
  let component: EmployeerListComponent;
  let fixture: ComponentFixture<EmployeerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
