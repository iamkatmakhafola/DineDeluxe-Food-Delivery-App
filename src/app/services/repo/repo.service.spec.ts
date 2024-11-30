import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';

describe('RepoService', () => {
  let service: RepoService;

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoService);
  });
});
