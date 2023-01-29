import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { Comprobantes } from 'src/app/domain/comprobante';
import { Consultas } from 'src/app/domain/consulta';
import { Detalle_Comprobantes } from 'src/app/domain/detalle-comprobantes';
import { ordenesMedicas } from 'src/app/domain/ordenMedica';
import { ServComprobanteService } from 'src/app/services/Comprobante-Services/serv-comprobante.service';
import { ServConsultasService } from 'src/app/services/Consultas-Services/serv-consultas.service';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss'],
})
export class ComprobanteComponent implements OnInit {
  comprobante: Comprobantes = new Comprobantes();
  detalleComprobante: Detalle_Comprobantes = new Detalle_Comprobantes();
  paciente: Colaboradores = new Colaboradores();

  cedula: string = '';
  seleccionComp: boolean = false;
  // editarDetalle:boolean = false;
  consultaDetalle: boolean = false;

  // lista_comprobantes: Comprobantes[] = [];
  lista_detalles: Detalle_Comprobantes[] = [];
  lista_consultas: Consultas[] = [];
  // lista_ordenes: ordenesMedicas[] = [];
  lista_seleccionados: Consultas[] = [];

  constructor(
    private servConsulta: ServConsultasService,
    private servComprobante: ServComprobanteService,
    // private route: ActivatedRoute
  ) {}

  // accion: string = '';

  ngOnInit(): void {
    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }
  }

  buscarPaciente() {
    if (this.cedula != '') {
      this.servConsulta.getConsultas().subscribe((d) => {
        this.paciente = new Colaboradores();
        this.lista_consultas = [];
        this.servComprobante.getComprobantes().subscribe((com) => {
          com.body!.forEach((fcom) => {
            console.log(fcom);
            
          })
          
        })
        
        d.body?.forEach((f) => {
          if (f.cita.paciente.cedula.includes(this.cedula)) {
            if (f.cita.estado != 'Finalizada' || f.cita.estado != 'Cancelada') {
              this.paciente = f.cita.paciente;
              // console.log(f);
              
              this.lista_consultas.push(f);
            }
          }
        });
        if (this.lista_consultas.length == 0) {
          this.consultaDetalle = false;
        } else {
          this.consultaDetalle = true;
        }
      });
    } else {
      this.paciente = new Colaboradores();
      this.lista_consultas = [];
    }
  }

  seleccion(consulta: Consultas) {
    if (this.lista_seleccionados.length > 0) {
      let existe: boolean = false;
      this.lista_seleccionados.forEach((f) => {
        if (f.id == consulta.id) {
          this.lista_seleccionados = this.lista_seleccionados.filter(
            (f) => f.id !== consulta.id
          );
          existe = true;
        } else {
          existe = false;
        }
      });

      if (!existe) {
        consulta.cita.medico.especialidad =
          consulta.cita.medico.especialidad.descripcion;
        // consulta.costo = parseInt(consulta.costo);
        this.lista_seleccionados.push(consulta);
        this.detalleComprobante.consulta = consulta;
      }
      console.log(existe);
    } else {
      consulta.cita.medico.especialidad =
        consulta.cita.medico.especialidad.descripcion;
      this.lista_seleccionados.push(consulta);
      this.detalleComprobante.consulta = consulta;
    }

    let newLista;
    this.lista_consultas.forEach((f) => {
      let e;
      this.lista_seleccionados.forEach((f2) => {
        if (f2.id == f.id) {
          e = true;
        } else {
          e = false;
        }
      });
      this.lista_consultas = e
        ? this.lista_consultas.filter((ff) => ff.id != f.id)
        : this.lista_consultas;
    });
    console.log(this.lista_seleccionados);
    this.seleccionComp = true;
  }

  addDetalle() {
    this.lista_detalles.push(this.detalleComprobante);
    this.detalleComprobante = new Detalle_Comprobantes();
    this.comprobante.total = 0;
    this.comprobante.subTotal = 0;
    this.lista_detalles.forEach((f) => {
      this.comprobante.total += f.total;
      this.comprobante.subTotal += f.total;
    });
    this.consultaDetalle = this.lista_consultas.length == 0 ? false : true;
    this.seleccionComp = false;
  }

  generar() {
    this.comprobante.total += 0.0;
    this.comprobante.subTotal += 0.0;
    this.comprobante.paciente = this.paciente;
    this.comprobante.detalles = this.lista_detalles;
    this.lista_detalles.forEach((f) => {
      f.consulta.ordenesMedicas = [];
      // console.log(f);
    });
    // console.log(this.comprobante);
    // // console.log(this.paciente);
    // // console.log(this.lista_detalles);
    this.servComprobante.registrar(this.comprobante).subscribe((d) => {
      d.status == 201 && d.statusText == 'Created'
        ? window.alert('Se genero con exito el comprobante')
        : window.alert('Hubo un problema intentelo mas tarde');
    });
  }

  cancelar() {
    this.comprobante = new Comprobantes();
    this.lista_detalles = [];
    this.cedula = '';
    this.detalleComprobante = new Detalle_Comprobantes();
    this.paciente = new Colaboradores();
  }
}
