import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPagsComponent } from './menu-pags.component';

describe('MenuPagsComponent', () => {
  let component: MenuPagsComponent;
  let fixture: ComponentFixture<MenuPagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
