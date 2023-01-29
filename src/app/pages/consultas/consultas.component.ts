import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citas } from 'src/app/domain/citas';
import { Consultas } from 'src/app/domain/consulta';
import { ordenesMedicas } from 'src/app/domain/ordenMedica';
import { Prescripciones } from 'src/app/domain/prescripcion';
import { ServCitasService } from 'src/app/services/Citas-Service/serv-citas.service';
import { ServConsultasService } from 'src/app/services/Consultas-Services/serv-consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss'],
})
export class ConsultasComponent implements OnInit {
  lista_citas: Citas[] = [];
  lista_consultas: Consultas[] = [];
  lista_ordenesMedicas: ordenesMedicas[] = [];
  lista_prescripciones: Prescripciones[] = [];
  fechaE: string[] = [];
  fechaS: string[] = [];

  cita: Citas = new Citas();
  consulta: Consultas = new Consultas();
  ordenes: ordenesMedicas = new ordenesMedicas();
  preescripcion: Prescripciones = new Prescripciones();
  prescripcion: boolean = false;
  citaS: boolean = false;
  registrarC: boolean = false;
  listado: boolean = true;
  editar: boolean = false;

  sintoma: string = '';
  sintomas: string[] = [];

  constructor(
    private servCitas: ServCitasService,
    private servConsultas: ServConsultasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }

    let edit;
    this.route.queryParams.subscribe((params) => {
      edit = params['editar']; // { order: "popular" }
    });
    console.log('== ', edit);

    this.servCitas.getCitas().subscribe((d) => {
      d.body!.forEach((f) => {
        if (
          (f.medico.id == localStorage.getItem('id') &&
            f.estado == 'Pendiente') ||
          f.estado == 'Reagendada' ||
          f.estado == 'Registrada' ||
          f.estado == 'Iniciada'
        ) {
          this.lista_citas.push(f);
        }
      });

      this.lista_citas.sort((a, b) => {
        let af: Date = new Date(a.fechaHoraEntrada);
        let bf: Date = new Date(b.fechaHoraEntrada);
        af = new Date(af.toDateString());
        bf = new Date(bf.toDateString());
        return bf.getTime() - af.getTime();
      });

      this.lista_citas.forEach((f) => {
        let date: Date = new Date(f.fechaHoraEntrada);
        this.fechaE.push(
          date.toLocaleDateString() + '  ' + date.toLocaleTimeString()
        );
        let dateS: Date = new Date(f.fechaHoraSalida);
        this.fechaS.push(
          dateS.toLocaleDateString() + '  ' + dateS.toLocaleTimeString()
        );
      });
    });

    if (edit != undefined) {
      console.log('edit');
      this.editar = true;
      this.servConsultas.getConsultasId(edit).subscribe((d) => {
        this.cita = d.body?.cita;
        this.consulta = d.body!;
        // console.log(d.body);
        // this.lista_ordenesMedicas = d.body?.ordenesMedicas;
        // for (let i = 0; i < this.lista_ordenesMedicas.length; i++) {
        //   const element = this.lista_ordenesMedicas[i];
        //   this.lista_prescripciones = element.preescripciones;
        // }
      });
    }
  }

  sintomaAdd() {
    this.sintomas.push(this.sintoma);
    this.sintoma = '';
    if (this.sintomas.length > 0) {
      let div_sintomas = document.getElementById('div-sintomas');
      let divLabels: any;
      for (let i = 0; i < this.sintomas.length; i++) {
        divLabels = document.createElement('div');
        divLabels.id = 'div-lab' + i;
        let label = document.createElement('label');
        label.innerHTML = 'Sintoma ' + (i + 1) + ': ' + this.sintomas[i];
        divLabels.appendChild(label);
      }
      div_sintomas!.appendChild(divLabels!);
    }
  }

  addPrescripcion() {
    this.lista_prescripciones.push(this.preescripcion);
    this.preescripcion = new Prescripciones();
  }

  ordenAdd(accion: string) {
    if (accion == 'add') {
      this.ordenes.sintomas = this.sintomas;
      this.ordenes.preescripciones = this.lista_prescripciones;
      this.lista_ordenesMedicas.push(this.ordenes);
      console.log(this.lista_ordenesMedicas);
      this.ordenes = new ordenesMedicas();
      this.lista_prescripciones = [];
      for (let i = 0; i < this.sintomas.length; i++) {
        const element = this.sintomas[i];
        document.getElementById('div-lab' + i)!.remove();
      }
      this.sintomas = [];
      this.registrarC = true;
    } else {
      this.ordenes = new ordenesMedicas();
      for (let i = 0; i < this.sintomas.length; i++) {
        const element = this.sintomas[i];
        document.getElementById('div-lab' + i)!.remove();
      }
      this.sintomas = [];
    }
  }

  registrar() {
    if (this.editar) {
      let c = window.confirm('¿Esta seguro de actualizar esta consulta?');
      if (c) {
        this.cita.medico.especialidad =
          this.cita.medico.especialidad.descripcion;
        this.cita.estado = 'Finalizada';
        this.consulta.cita = this.cita;
        this.consulta.ordenesMedicas = this.lista_ordenesMedicas;
        this.ordenes.preescripciones = this.lista_prescripciones;

        this.servConsultas.actualizar(this.consulta, this.consulta.id).subscribe((d) => {
          // window.location.reload();
          window.alert('Se ha registrado la consulta');
          window.location.href = 'gestion-consultas'
        });
      } else {
        window.alert('NOp');
      }
    } else {
      let c = window.confirm('¿Esta seguro de registrar esta consulta?');
      if (c) {
        this.cita.medico.especialidad =
          this.cita.medico.especialidad.descripcion;
        this.cita.estado = 'Finalizada';
        this.consulta.cita = this.cita;
        this.consulta.ordenesMedicas = this.lista_ordenesMedicas;
        this.ordenes.preescripciones = this.lista_prescripciones;

        this.servConsultas.crear(this.consulta)
        .subscribe((d) => {
          // console.log(d);
          // this.listado = true;
          this.servCitas.actualizar(this.cita).subscribe((d) => {
            window.location.reload();
  
            window.alert('Se ha registrado la consulta');
          })
        });
      } else {
        window.alert('NOp');
      }
    }
  }
}


