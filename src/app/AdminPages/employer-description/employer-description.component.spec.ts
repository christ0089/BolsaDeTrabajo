import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerDescriptionComponent } from './employer-description.component';

describe('EmployerDescriptionComponent', () => {
  let component: EmployerDescriptionComponent;
  let fixture: ComponentFixture<EmployerDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
