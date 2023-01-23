import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServMedicoService } from 'src/app/services/Medicos-Service/serv-medico.service';
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
  isColaborador: boolean = false;

  constructor(
    private servColaboradores: ServColaboradorService,
    private servMedico: ServMedicoService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.colaborador = new Colaboradores();
    localStorage.setItem('id', '');
    localStorage.setItem('rol', '');
  }

  rolClick(){
    if(this.colaborador.rol == 'Colaborador'){
      this.isColaborador = true;
    }else{
      this.isColaborador = false;
    }
  }

  registrar(opc: string) {
    if (opc == 'registrar') {
      const container = document.getElementById('container');
      container!.classList.add('right-panel-active');
      this.colaborador = new Colaboradores();
    } else {
      if(this.isColaborador){
        this.servColaboradores.registrar(this.colaborador)
        .subscribe((d) => {
          this.colaborador = new Colaboradores();
          const container = document.getElementById('container');
          container!.classList.remove('right-panel-active');      
        });
      }else{
        this.servMedico.registrar(this.colaborador)
        .subscribe((d) => {
          this.colaborador = new Colaboradores();
          const container = document.getElementById('container');
          container!.classList.remove('right-panel-active');
        })
      }
    }
  }

  iniciar(opc: string) {
    if (opc == 'iniciar') {
      const container = document.getElementById('container');
      container!.classList.remove('right-panel-active');
    } else {      
        this.servColaboradores.getColaboradores().subscribe((d) => {
          d.body?.forEach((d) => {
            if (
              this.colaborador.email == d.email &&
              this.colaborador.contrasenia == d.contrasenia
            ) {
              localStorage.setItem('id', d.id);
              localStorage.setItem('rol', d.rol);
              this.isColaborador = true;
              this.colaborador = d;
              this.route.navigate(['editar']);              
            }
          });
          
          let loginMedico = false;
          if(this.isColaborador == false){
            this.servMedico.getMedicos().subscribe((d) => {                                    
              d.body!.forEach((d) => {
                if(this.colaborador.email == d.email &&
                  this.colaborador.contrasenia == d.contrasenia){
                    localStorage.setItem('id', d.id);
                    localStorage.setItem('rol', d.rol);             
                    loginMedico = true;       
                    this.colaborador = d;          
                    this.route.navigate(['editar']);
                  }
              });
              if(!this.isColaborador && !loginMedico){
                window.alert("Ingrese un correo y contraseña validos")
              }
            })              
            
          }
        });

      
        
    }
  }
}
