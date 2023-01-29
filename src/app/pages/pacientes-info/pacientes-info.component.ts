import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServPacienteService } from 'src/app/services/Paciente-Service/serv-paciente.service';

@Component({
  selector: 'app-pacientes-info',
  templateUrl: './pacientes-info.component.html',
  styleUrls: ['./pacientes-info.component.scss'],
})
export class PacientesInfoComponent implements OnInit {
  colaborador: Colaboradores = new Colaboradores();
  lista_colaboradores: Colaboradores[] = [];
  cedula:string = '';

  constructor(private servPacientes:ServPacienteService, private router:Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
    
    this.servPacientes.getPacientes().subscribe((d) => {
      this.lista_colaboradores = d.body!;           
    })
  }

  eliminiar(cedula:string){
    this.lista_colaboradores.forEach((f) =>{
      if(f.cedula == cedula){
        this.servPacientes.eliminar(f.id).subscribe((d) => {
          console.log(d);          
          if(d.status == 200 && d.statusText == 'OK'){
            this.servPacientes.getPacientes().subscribe((d) => {
              this.lista_colaboradores = d.body!;           
            })
          }else{
            window.alert('Se produjo un error al eliminar este paciente');
          }
        })
      }
    })

  }

  editar(cedula:string){
    let params: NavigationExtras = {
      queryParams: {
        paciente: cedula
      },
    };
    
    this.router.navigate(['/editar'], params);
  }

  buscarCedula(){
    this.servPacientes.getPacientes().subscribe((d) => {
      this.lista_colaboradores = [];
      d.body?.forEach((f) => {
        if(f.cedula.includes(this.cedula)){
          this.lista_colaboradores.push(f);
        }
      })
    })
  }
}
