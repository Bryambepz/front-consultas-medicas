import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transacciones } from 'src/app/domain/transaccion';

@Injectable({
  providedIn: 'root'
})
export class ServTransaccionService {
  private url = 'http://localhost:3000/transacciones/';

  constructor(private http: HttpClient) {}

  registrar(transaccion: Transacciones, tipo:string) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(transaccion);
    body = '{'+body.substring(body.search('asunto')-1,body.length);
    if(tipo == 'ingreso'){
      body = body.substring(0, body.search(',"numero"')) + body.substring(body.search(',"observacion'), body.length) 
    }else{
      body = body.substring(0, body.search(',"comprobante')) + '}';
    }

    // for (let i = 0; i < body.length; i++) {
    //   let id = body.substring(i,i+8);     
    //   if(id == '"id":"",'){
    //     let pos = body.search('"id":"",')
    //     body = body.substring(0,pos) + body.substring(pos+8,body.length)
    //   }
      
    //   let costo = body.substring(i,i+8);
    //   if(costo == 'costo":"'){
    //     let pos = body.search('costo":"');
    //     body = body.substring(0,pos+7) + body.substring(pos+8, pos+9) + body.substring(pos+10, body.length)
    //   }
    // }

    console.log(body);
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getComprobantes(){
    return this.http.get<Transacciones[]>(this.url, {
      observe: 'response'
    });
  }
  
  // getComprobanteId(id:string):Observable<HttpResponse<Comprobantes[]>>{
  //   const headers = { 'content-type': 'application/json' };
  //   return this.http.get<Comprobantes[]>(this.url, {
  //     headers: headers,
  //     params: {
  //       termino: id
  //     },
  //     observe: 'response'
  //   });    
  // }

}
