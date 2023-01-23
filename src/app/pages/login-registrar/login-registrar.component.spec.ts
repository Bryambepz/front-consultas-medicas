import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrarComponent } from './login-registrar.component';

describe('LoginRegistrarComponent', () => {
  let component: LoginRegistrarComponent;
  let fixture: ComponentFixture<LoginRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
