import { TestBed } from '@angular/core/testing';

import { ServConsultasService } from './serv-consultas.service';

describe('ServConsultasService', () => {
  let service: ServConsultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServConsultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
