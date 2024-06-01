import { TestBed } from '@angular/core/testing';

import { EntranceTestService } from './entrance-test.service';

describe('EntranceTestService', () => {
  let service: EntranceTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntranceTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
