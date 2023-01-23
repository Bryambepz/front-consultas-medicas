import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServColaboradorService } from 'src/app/services/serv-colaborador.service';

@Component({
  selector: 'app-login-registrar',
  templateUrl: './login-registrar.component.html',
  styleUrls: ['./login-registrar.component.scss'],
})
export class LoginRegistrarComponent implements OnInit {
  signUpButton = document.getElementById('signUp');
  signInButton = document.getElementById('signIn');

  colaborador: Colaboradores = new Colaboradores();

  constructor(
    private servColaboradores: ServColaboradorService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.colaborador = new Colaboradores();
    localStorage.setItem('id', '');
    localStorage.setItem('rol', '');
  }

  registrar(opc: string) {
    if (opc == 'registrar') {
      const container = document.getElementById('container');
      container!.classList.add('right-panel-active');
      this.colaborador = new Colaboradores();
    } else {
      this.servColaboradores.registrar(this.colaborador).subscribe((d) => {
        this.colaborador = new Colaboradores();
        const container = document.getElementById('container');
        container!.classList.remove('right-panel-active');
      });
    }
  }

  iniciar(opc: string) {
    if (opc == 'iniciar') {
      const container = document.getElementById('container');
      container!.classList.remove('right-panel-active');
    } else {
      console.log('inicar se ; ', this.colaborador);
      this.servColaboradores.getColaboradores().subscribe((d) => {
        d.body?.forEach((d) => {
          if (
            this.colaborador.email == d.email &&
            this.colaborador.contrasenia == d.contrasenia
          ) {
            localStorage.setItem('id', d.id);
            localStorage.setItem('rol', d.rol);

            this.route.navigate(['colaboradores']);
          }
        });
      });
    }
  }
}
