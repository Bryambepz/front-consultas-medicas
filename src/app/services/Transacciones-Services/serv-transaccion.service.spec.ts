import { TestBed } from '@angular/core/testing';

import { ServTransaccionService } from './serv-transaccion.service';

describe('ServTransaccionService', () => {
  let service: ServTransaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServTransaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
