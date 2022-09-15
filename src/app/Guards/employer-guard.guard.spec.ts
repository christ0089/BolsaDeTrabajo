import { TestBed } from '@angular/core/testing';

import { EmployerGuardGuard } from './employer-guard.guard';

describe('EmployerGuardGuard', () => {
  let guard: EmployerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
