import { TestBed } from '@angular/core/testing';

import { BmiService } from './service.service';

describe('ServiceService', () => {
  let service: BmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
