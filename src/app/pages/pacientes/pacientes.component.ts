import { Component, OnInit } from '@angular/core';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServPacienteService } from 'src/app/services/Paciente-Service/serv-paciente.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit{
  colaborador: Colaboradores = new Colaboradores();
  
  constructor(private servPaciente:ServPacienteService){}

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
  }

  pacienteRegs(){
    console.log(this.colaborador);
    this.servPaciente.registrar(this.colaborador).subscribe((d) => {
      console.log(d);
      window.alert("Se ha registrado un paciente");
      this.colaborador = new Colaboradores();
    })
  }
}
