import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserJobApplicationsComponent } from './user-job-applications.component';

describe('UserJobApplicationsComponent', () => {
  let component: UserJobApplicationsComponent;
  let fixture: ComponentFixture<UserJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserJobApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
