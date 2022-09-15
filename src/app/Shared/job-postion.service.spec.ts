import { TestBed } from '@angular/core/testing';

import { JobPostionService } from './job-postion.service';

describe('JobPostionService', () => {
  let service: JobPostionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobPostionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
