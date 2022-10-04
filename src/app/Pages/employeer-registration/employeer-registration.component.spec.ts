import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerRegistrationComponent } from './employeer-registration.component';

describe('EmployeerRegistrationComponent', () => {
  let component: EmployeerRegistrationComponent;
  let fixture: ComponentFixture<EmployeerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeerRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
