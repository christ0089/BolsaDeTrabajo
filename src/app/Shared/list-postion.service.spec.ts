import { TestBed } from '@angular/core/testing';

import { ListPostionService } from './list-postion.service';

describe('ListPostionService', () => {
  let service: ListPostionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPostionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
