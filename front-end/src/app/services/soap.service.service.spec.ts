import { TestBed } from '@angular/core/testing';

import { Soap.ServiceService } from './soap.service.service';

describe('Soap.ServiceService', () => {
  let service: Soap.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Soap.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
