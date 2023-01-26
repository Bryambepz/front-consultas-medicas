import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { Comprobantes } from 'src/app/domain/comprobante';
import { Consultas } from 'src/app/domain/consulta';
import { Detalle_Comprobantes } from 'src/app/domain/detalle-comprobantes';
import { ordenesMedicas } from 'src/app/domain/ordenMedica';
import { ServConsultasService } from 'src/app/services/Consultas-Services/serv-consultas.service';
import { ServPacienteService } from 'src/app/services/Paciente-Service/serv-paciente.service';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit, OnChanges{
  comprobante:Comprobantes = new Comprobantes();
  detalleComprobante: Detalle_Comprobantes = new Detalle_Comprobantes();
  paciente: Colaboradores = new Colaboradores();
  cedula:string='';
  
  // lista_comprobantes: Comprobantes[] = [];
  // lista_detalles: Detalle_Comprobantes[] = [];
  lista_consultas: Consultas[] = [];
  lista_ordenes: ordenesMedicas[] = [];
  lista_seleccionados: Consultas[] = [];

  // estadoSeleccion:boolean = false;

  constructor(
    private servConsulta: ServConsultasService
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambio');
    
  }

  ngOnInit(): void {
  }

  buscarPaciente(){
    if(this.cedula != ''){
      this.servConsulta.getConsultas().subscribe((d) => {
        this.paciente = new Colaboradores();
        this.lista_consultas = [];
        d.body?.forEach((f) => {
          if(f.cita.paciente.cedula.includes(this.cedula)){
            if(f.cita.estado != 'Finalizada' || f.cita.estado != 'Cancelada'){
              this.paciente = f.cita.paciente;
              this.lista_consultas.push(f)
            }
          }
        })
        
      })
      

    }else{
      this.paciente = new Colaboradores();
      this.lista_consultas = [];
    }
  }

  seleccion(consulta:Consultas){
    if (this.lista_seleccionados.length > 0) {
      let existe: boolean = false;
      this.lista_seleccionados.forEach((f) => {
        if (f.id == consulta.id) {
          this.lista_seleccionados = this.lista_seleccionados.filter((f) => f.id !== consulta.id)
          existe = true;
        } else {
          existe = false;
        }        
      });

      if(!existe){
        this.lista_seleccionados.push(consulta);
      }
      console.log(existe);
    }else{
      this.lista_seleccionados.push(consulta);
    }
    console.log(this.lista_seleccionados);
    
  }
}
