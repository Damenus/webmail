import { TestBed, inject } from '@angular/core/testing';

import { NewMailService } from './new-mail.service';

describe('NewMailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewMailService]
    });
  });

  it('should be created', inject([NewMailService], (service: NewMailService) => {
    expect(service).toBeTruthy();
  }));
});
