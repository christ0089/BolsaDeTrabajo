import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedApplicationsComponent } from './reported-applications.component';

describe('ReportedApplicationsComponent', () => {
  let component: ReportedApplicationsComponent;
  let fixture: ComponentFixture<ReportedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
