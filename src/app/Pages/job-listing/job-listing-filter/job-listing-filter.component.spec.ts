import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingFilterComponent } from './job-listing-filter.component';

describe('JobListingFilterComponent', () => {
  let component: JobListingFilterComponent;
  let fixture: ComponentFixture<JobListingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListingFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
