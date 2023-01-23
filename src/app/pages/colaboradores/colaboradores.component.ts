import { Component, OnInit } from '@angular/core';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServColaboradorService } from 'src/app/services/serv-colaborador.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent implements OnInit {
  constructor(private servColaborador: ServColaboradorService) {}
  colaborador: Colaboradores = new Colaboradores();

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
    this.servColaborador
      .getColaboradorId(localStorage.getItem('id')!.toString())
      .subscribe((d) => {
        this.colaborador = d.body?.at(0)!;
        // console.log(localStorage.getItem('id'), ' == ', this.colaborador);
      });
  }

  actualizar() {
    console.log(this.colaborador);

    this.servColaborador
      .actualizar(this.colaborador, localStorage.getItem('id')!.toString())
      .subscribe((d) => {
        window.location.reload();
        window.alert('Se ha actualizado la información');
      });
  }
  eliminar() {
    this.servColaborador
      .eliminar(localStorage.getItem('id')!.toString())
      .subscribe((d) => {
        console.log(d);
        if(d.status == 200 && d.statusText == 'OK'){
          localStorage.setItem('id', '');
          localStorage.setItem('rol', '');
        }
      });
  }
}
