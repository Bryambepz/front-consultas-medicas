import { TestBed } from '@angular/core/testing';

import { ServCitasService } from './serv-citas.service';

describe('ServCitasService', () => {
  let service: ServCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
