import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServColaboradorService } from 'src/app/services/serv-colaborador.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
})
export class RecuperarPasswordComponent implements OnInit {
  colaborador: Colaboradores = new Colaboradores();
  cuenta:boolean=false;
  nContrasenia:string = '';

  constructor(private servColaboradores: ServColaboradorService, private route: Router) {}

  ngOnInit(): void {
  }

  verificarCuenta() {
    this.servColaboradores.getColaboradores().subscribe((d) => {
      console.log(d);
      d.body!.forEach((d) => {
        if(this.colaborador.cedula == d.cedula &&
          this.colaborador.email == d.email){
            this.colaborador = d
            this.cuenta = true

          }
      })

      
    });
  }

  recuperar(){
    console.log(this.colaborador);
    this.colaborador.contrasenia = this.nContrasenia;
    this.servColaboradores.actualizar(this.colaborador, this.colaborador.id).subscribe((d) => {
      if(d.ok){
        this.route.navigate(['/login'])
      }else{
        window.alert('Se produjo un error intentelo mas tarde')
      }
    })
    
  }
}
