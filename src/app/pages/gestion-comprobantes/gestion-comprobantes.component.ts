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
  
  constructor(
    private servComprobantes: ServComprobanteService,
    private servTransaccion: ServTransaccionService
  ){}

  ngOnInit(): void {
     this.servComprobantes.getComprobantes().subscribe((d) => d.body!.forEach((f) => (f.estado != 'Anulado')? this.lista_comprobantes.push(f): this.lista_comprobantes))
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
    // this.servComprobantes.getComprobanteId(this.comprobante.id).subscribe((d) => {
    //   console.log(d.body!.at(0));
    //   this.servTransaccion.registrar(this.transaccion)
    // })
    this.comprobante.estado = 'Pagada';
    this.comprobante.detalles = [];
    this.transaccion.comprobante = this.comprobante;
    console.log(this.transaccion);
    this.servTransaccion.registrar(this.transaccion).subscribe((d) => {
      if(d.status == 200 && d.statusText == 'OK'){
        window.alert('Se ha realizado la transferencia con exito');
        console.log(this.comprobante);
        
        // this.servComprobantes.actualizar(this.comprobante, this.comprobante.id).subscribe((d) => {
        //   if(d.status == 200 && d.statusText == 'OK'){
        //     window.alert('Se ha realizado la transferencia con exito');
        //   }
        // })
      }
    })
  }

}
