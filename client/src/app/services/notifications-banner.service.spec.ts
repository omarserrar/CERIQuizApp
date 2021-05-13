import { TestBed } from '@angular/core/testing';

import { NotificationsBannerService } from './notifications-banner.service';

describe('NotificationsBannerService', () => {
  let service: NotificationsBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
