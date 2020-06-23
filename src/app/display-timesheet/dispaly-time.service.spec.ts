import { TestBed } from '@angular/core/testing';

import { DispalyTimeService } from './dispaly-time.service';

describe('DispalyTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispalyTimeService = TestBed.get(DispalyTimeService);
    expect(service).toBeTruthy();
  });
});
