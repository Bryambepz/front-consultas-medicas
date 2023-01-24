import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServMedicoService } from 'src/app/services/Medicos-Service/serv-medico.service';
import { ServPacienteService } from 'src/app/services/Paciente-Service/serv-paciente.service';
import { ServColaboradorService } from 'src/app/services/serv-colaborador.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  constructor(
    private servColaborador: ServColaboradorService,
    private servMedico: ServMedicoService,
    private servPaciente: ServPacienteService,
    private route:ActivatedRoute
  ) {}

  colaborador: Colaboradores = new Colaboradores();
  isColaborador: boolean = false;
  isPaciente:boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
    
    let cedula = '';
    this.route.queryParams.subscribe((params) => {
      cedula = params['paciente']; // { order: "popular" }
    });
    
    if(cedula == undefined){
      if (localStorage.getItem('rol') == 'Colaborador') {
        this.isColaborador = true;
        this.servColaborador
          .getColaboradorId(localStorage.getItem('id')!.toString())
          .subscribe((d) => {
            this.colaborador = d.body?.at(0)!;
            this.isColaborador =
              this.colaborador.rol == 'Colaborador' ? true : false;          
          });
      } else {
        this.isColaborador = false;
        this.servMedico
          .getMedicoId(localStorage.getItem('id')!.toString())
          .subscribe((d) => {
            this.colaborador = d.body?.at(0)!;
            this.isColaborador =
              this.colaborador.rol == 'Colaborador' ? true : false;          
          });
      }
    }else{
      this.servPaciente.getPacientes().subscribe((d) => {
        d.body!.forEach((f) => {
          if(f.cedula == cedula){
            this.colaborador = f;
            this.isPaciente = true;            
          }
        })
      })
    }

  }

  actualizar() {
    if (this.isColaborador) {
      this.servColaborador
        .actualizar(this.colaborador, localStorage.getItem('id')!.toString())
        .subscribe((d) => {
          window.location.reload();
          window.alert('Se ha actualizado la información');
        });
    } else if (!this.isColaborador && !this.isPaciente){
      this.servMedico
        .actualizar(this.colaborador, localStorage.getItem('id')!.toString())
        .subscribe((d) => {
          window.location.reload();
          window.alert('Se ha actualizado la información');
        });
    }else{
      console.log('paciente',this.colaborador);
      this.servPaciente.actualizar(this.colaborador, this.colaborador.id).subscribe((d) => {
        window.location.reload();
        window.alert('Se ha actualizado la información del paciente');
      })
    }
  }
  eliminar() {
    if (this.isColaborador) {
      this.servColaborador
        .eliminar(localStorage.getItem('id')!.toString())
        .subscribe((d) => {          
          if (d.status == 200 && d.statusText == 'OK') {
            localStorage.setItem('id', '');
            localStorage.setItem('rol', '');
            window.location.reload();
          }
        });
    } else {
      this.servMedico
        .eliminar(localStorage.getItem('id')!.toString())
        .subscribe((d) => {          
          if (d.status == 200 && d.statusText == 'OK') {
            localStorage.setItem('id', '');
            localStorage.setItem('rol', '');
            window.location.reload();
          }
        });
    }
  }
}
