import { TestBed } from '@angular/core/testing';

import { SimpleNgLoaderInterceptor } from './simple-ng-loader.interceptor';

describe('SimpleNgLoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SimpleNgLoaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SimpleNgLoaderInterceptor = TestBed.inject(SimpleNgLoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
