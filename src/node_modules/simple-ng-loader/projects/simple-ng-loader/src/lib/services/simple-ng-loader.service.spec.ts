import { TestBed } from '@angular/core/testing';

import { SimpleNgLoaderService } from './simple-ng-loader.service';

describe('SimpleNgLoaderService', () => {
  let service: SimpleNgLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleNgLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
