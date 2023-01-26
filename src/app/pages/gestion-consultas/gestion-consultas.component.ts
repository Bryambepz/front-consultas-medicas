import { Component, OnInit } from '@angular/core';
import { Consultas } from 'src/app/domain/consulta';
import { ordenesMedicas } from 'src/app/domain/ordenMedica';
import { Prescripciones } from 'src/app/domain/prescripcion';
import { ServConsultasService } from 'src/app/services/Consultas-Services/serv-consultas.service';

@Component({
  selector: 'app-gestion-consultas',
  templateUrl: './gestion-consultas.component.html',
  styleUrls: ['./gestion-consultas.component.scss'],
})
export class GestionConsultasComponent implements OnInit {
  lista_consultas: Consultas[] = [];
  lista_ordenes: ordenesMedicas[] = [];
  lista_prescripciones: Prescripciones[] = [];

  idConsulta: string = '';
  ordenesV: boolean = false;
  prescripcionV: boolean = false;

  constructor(private servConsultas: ServConsultasService) {}

  ngOnInit(): void {
    this.servConsultas.getConsultas().subscribe((d) => {
      d.body!.forEach((f) => {
        if (f.cita.medico.id == localStorage.getItem('id')!.toString()) {
          this.lista_consultas.push(f);
        }
      });
      // console.log(this.lista_consultas);
    });
  }

  verOrdenes(id: string) {
    this.idConsulta = id;
    this.lista_ordenes = [];
    this.servConsultas.getConsultasId(id).subscribe((d) => {
      this.lista_ordenes = d.body!.ordenesMedicas!;
    });
  }

  verPrescripciones(id: string) {
    this.lista_prescripciones = [];
    console.log(this.idConsulta, '==', id);
    this.servConsultas.getConsultasId(this.idConsulta).subscribe((d) => {
      for (let i = 0; i < d.body!.ordenesMedicas.length; i++) {
        const element = d.body!.ordenesMedicas[i];
        if (element.id == id) {
          this.lista_prescripciones = element.preescripciones;
        }
      }
    });
  }

  eliminar(id: string) {
    this.servConsultas.eliminar(id).subscribe((d) => {
      console.log(d);
      if(d.status == 200 && d.statusText == 'OK'){
        window.alert('Se ha eliminado con exito');
        // d.body!.forEach((f) => {
        //   if (f.cita.medico.id == localStorage.getItem('id')!.toString()) {
        //     this.lista_consultas.push(f);
        //   }
        // });
      }else{
        window.alert('Hubo un problema intentelo mas tarde');
      }
    })
  }

  editar(id:string) {
    window.location.href = '/consulta?editar='+id
  }
}
