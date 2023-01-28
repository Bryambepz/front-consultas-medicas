import { TestBed } from '@angular/core/testing';

import { ServComprobanteService } from './serv-comprobante.service';

describe('ServComprobanteService', () => {
  let service: ServComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
