import { TestBed } from '@angular/core/testing';

import { SKUService } from './sku.service';

describe('SKUService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SKUService = TestBed.get(SKUService);
    expect(service).toBeTruthy();
  });
});
