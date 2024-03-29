import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerInfoFormComponent } from './employer-info-form.component';

describe('EmployerInfoFormComponent', () => {
  let component: EmployerInfoFormComponent;
  let fixture: ComponentFixture<EmployerInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerInfoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
