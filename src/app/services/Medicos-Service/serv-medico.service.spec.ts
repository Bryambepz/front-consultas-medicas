import { TestBed } from '@angular/core/testing';

import { ServMedicoService } from './serv-medico.service';

describe('ServMedicoService', () => {
  let service: ServMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
