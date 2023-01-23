import { Component, OnInit } from '@angular/core';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServMedicoService } from 'src/app/services/Medicos-Service/serv-medico.service';
import { ServColaboradorService } from 'src/app/services/serv-colaborador.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  constructor(
    private servColaborador: ServColaboradorService,
    private servMedico: ServMedicoService
  ) {}

  colaborador: Colaboradores = new Colaboradores();
  isColaborador: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
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
  }

  actualizar() {
    if (this.isColaborador) {
      this.servColaborador
        .actualizar(this.colaborador, localStorage.getItem('id')!.toString())
        .subscribe((d) => {
          window.location.reload();
          window.alert('Se ha actualizado la información');
        });
    } else {
      this.servMedico
        .actualizar(this.colaborador, localStorage.getItem('id')!.toString())
        .subscribe((d) => {
          window.location.reload();
          window.alert('Se ha actualizado la información');
        });
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
