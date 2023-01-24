import { TestBed } from '@angular/core/testing';

import { ServPacienteService } from './serv-paciente.service';

describe('ServPacienteService', () => {
  let service: ServPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
