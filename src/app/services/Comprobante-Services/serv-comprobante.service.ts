import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comprobantes } from 'src/app/domain/comprobante';

@Injectable({
  providedIn: 'root'
})
export class ServComprobanteService {
  private url = 'http://localhost:3000/comprobantes/';

  constructor(private http: HttpClient) {}

  registrar(comprobante: Comprobantes) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(comprobante);
    body = '{'+body.substring(body.search('observacion')-1,body.length);
    for (let i = 0; i < body.length; i++) {
      let id = body.substring(i,i+8);     
      if(id == '"id":"",'){
        let pos = body.search('"id":"",')
        body = body.substring(0,pos) + body.substring(pos+8,body.length)
      }
      
      let costo = body.substring(i,i+8);
      if(costo == 'costo":"'){
        let pos = body.search('costo":"');
        body = body.substring(0,pos+7) + body.substring(pos+8, pos+9) + body.substring(pos+10, body.length)
      }
    }

    // console.log(body);
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getComprobantes(){
    return this.http.get<Comprobantes[]>(this.url, {
      observe: 'response'
    });
  }
  
  getComprobanteId(id:string):Observable<HttpResponse<Comprobantes[]>>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Comprobantes[]>(this.url, {
      headers: headers,
      params: {
        termino: id
      },
      observe: 'response'
    });    
  }

  actualizar(comprobante:Comprobantes, id:string)
  :Observable<HttpResponse<Comprobantes[]>>
  {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(comprobante);
    body = '{'+body.substring(body.search('observacion')-1,body.length);
    body = body.substring(0,body.search('"detalles')) + body.substring(body.search('"paciente"'), body.length)
    console.log('act comp >',body);
    
    return this.http.patch<Comprobantes[]>(this.url + id, body, {
      headers: headers,
      observe: 'response'
    })
  }

  // eliminar(idEliminar:string){
  //   return this.http.delete(this.url+idEliminar, {observe: 'response'})
  // }

}
