import { TestBed, inject } from '@angular/core/testing';

import { ApoioService } from './apoio.service';

describe('ApoioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApoioService]
    });
  });

  it('should be created', inject([ApoioService], (service: ApoioService) => {
    expect(service).toBeTruthy();
  }));
});
