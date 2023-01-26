import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionConsultasComponent } from './gestion-consultas.component';

describe('GestionConsultasComponent', () => {
  let component: GestionConsultasComponent;
  let fixture: ComponentFixture<GestionConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionConsultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
