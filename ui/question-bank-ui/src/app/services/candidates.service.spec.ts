import { TestBed } from '@angular/core/testing';

import { CandidatesService } from './candidates.service';

describe('CandiatesService', () => {
  let service: CandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
