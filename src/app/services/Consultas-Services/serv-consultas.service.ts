import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from 'src/app/domain/consulta';

@Injectable({
  providedIn: 'root'
})
export class ServConsultasService { 
  private url = 'http://localhost:3000/consultas/'
  
  constructor(private http: HttpClient) { }

  crear(consulta: Consultas) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(consulta);
    body = '{'+body.substring(body.search('detalle')-1,body.length);

    for (let i = 0; i < body.length; i++) {
      let id = body.substring(i,i+8)
      if(id == '"id":"",'){
        let pos = body.search('"id":"",')
        body = body.substring(0,pos) + body.substring(pos+8,body.length)
      }
    }
    console.log(body);
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getConsultas(){
    return this.http.get<Consultas[]>(this.url, {
      observe: 'response'
    });
  }
  
  getConsultasId(id:string):Observable<HttpResponse<Consultas>>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Consultas>(this.url+id, {
      headers: headers,
      observe: 'response'
    });    
  }

  actualizar(consulta:Consultas, id:string):Observable<HttpResponse<Consultas[]>>{
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(consulta);
    body = '{'+body.substring(body.search('detalle')-1,body.length);
    for (let i = 0; i < body.length; i++) {
      let id = body.substring(i,i+8)
      if(id == '"id":"",'){
        let pos = body.search('"id":"",')
        body = body.substring(0,pos) + body.substring(pos+8,body.length)
      }
    }
    console.log(body);
    
    return this.http.patch<Consultas[]>(this.url + id, body, {
      headers: headers,
      observe: 'response'
    })
  }

  eliminar(idEliminar:string){
    return this.http.delete(this.url+idEliminar, {observe: 'response'})
  }

}


