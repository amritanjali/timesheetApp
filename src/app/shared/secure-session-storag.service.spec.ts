import { TestBed } from '@angular/core/testing';

import { SecureSessionStoragService } from './secure-session-storag.service';

describe('SecureSessionStoragService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureSessionStoragService = TestBed.get(SecureSessionStoragService);
    expect(service).toBeTruthy();
  });
});
