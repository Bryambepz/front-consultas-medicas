import { TestBed } from '@angular/core/testing';

import { ServColaboradorService } from './serv-colaborador.service';

describe('ServConsutorService', () => {
  let service: ServColaboradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServColaboradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
