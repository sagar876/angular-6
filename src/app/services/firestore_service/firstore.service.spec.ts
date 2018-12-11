import { TestBed, inject } from '@angular/core/testing';

import { FirstoreService } from './firstore.service';

describe('FirstoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstoreService]
    });
  });

  it('should be created', inject([FirstoreService], (service: FirstoreService) => {
    expect(service).toBeTruthy();
  }));
});
