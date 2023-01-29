import { Component, OnInit } from '@angular/core';
import { Comprobantes } from 'src/app/domain/comprobante';
import { Transacciones } from 'src/app/domain/transaccion';
import { ServComprobanteService } from 'src/app/services/Comprobante-Services/serv-comprobante.service';
import { ServTransaccionService } from 'src/app/services/Transacciones-Services/serv-transaccion.service';

@Component({
  selector: 'app-gestion-comprobantes',
  templateUrl: './gestion-comprobantes.component.html',
  styleUrls: ['./gestion-comprobantes.component.scss']
})
export class GestionComprobantesComponent implements OnInit{
  transaccion: Transacciones = new Transacciones();
  lista_comprobantes: Comprobantes[] = [];

  comprobante:Comprobantes = new Comprobantes();
  addTrasac:boolean = false;
  opcion:string = 'Todos';
  transacCom: boolean = false;
  
  constructor(
    private servComprobantes: ServComprobanteService,
    private servTransaccion: ServTransaccionService
  ){}

  ngOnInit(): void {
     this.servComprobantes.getComprobantes().subscribe((d) => d.body!.forEach((f) => this.lista_comprobantes.push(f)))
  }

  listarSegun(){
    this.lista_comprobantes = [];
    this.servComprobantes.getComprobantes().subscribe((d) => this.lista_comprobantes = d.body!.filter((f) => 
    (this.opcion == 'Todos')? 
    this.lista_comprobantes.push(f): 
    (this.opcion == 'Anulados')? f.estado == 'Anulado': (this.opcion == 'Generados')? f.estado == 'Generada': f.estado == 'Pagada'
    ))
  }
  eliminarComprobante(idComp:string){
    this.servComprobantes.getComprobanteId(idComp).subscribe((d) =>{
      let comprobante: Comprobantes = new Comprobantes();
      comprobante = d.body!.at(0)!
      comprobante.estado = 'Anulado'
      this.servComprobantes.actualizar(comprobante, comprobante.id).subscribe((d2) => {
        if(d2.status == 200 && d2.statusText == 'OK'){
          window.alert('Se ha eliminado con exito');
          window.location.reload();
        }else{
          window.alert('Hubo un problema, intentelo mas tarde')
        }
      });
      
    })    
  }

  transaccionCreate(){
    if(this.transaccion.tipo == 'Ingreso'){    
      this.comprobante.estado = 'Pagada';
      this.comprobante.detalles = [];
      this.transaccion.comprobante = this.comprobante;
      console.log(this.transaccion);
      this.servTransaccion.registrar(this.transaccion, 'ingreso')
      .subscribe((d) => {
        if(d.status == 200 && d.statusText == 'OK'){
          window.alert('Se ha realizado la transferencia con exito');
          console.log(this.comprobante);      
          this.servComprobantes.actualizar(this.comprobante, this.comprobante.id)
        }
      })
    }else{
      
      this.servTransaccion.registrar(this.transaccion, 'egreso')
      .subscribe((d) => {
        if(d.status == 200 && d.statusText == 'OK'){
          window.alert('Se ha realizado la transferencia con exito');
          console.log(this.comprobante);      
        }
      })
    }
  }

}
