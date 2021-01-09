import { TestBed } from '@angular/core/testing';

import { WservService } from './wserv.service';

describe('WservService', () => {
  let service: WservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
