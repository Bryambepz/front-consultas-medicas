import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaboradores } from 'src/app/domain/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ServMedicoService {
  private url = 'http://localhost:3000/medicos/';

  constructor(private http: HttpClient) { }

  registrar(medico: Colaboradores) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(medico);
    body = '{'+body.substring(body.search('cedula')-1,body.length);
    body = body.substring(0, body.search('fechaNacimiento')-2)+'}';
    body = body.substring(0,body.search('rol')-1) 
            + body.substring(body.search('especialidad')-1, body.length-1) + '}';
    console.log(body);
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getMedicos(){
    return this.http.get<Colaboradores[]>(this.url, {
      observe: 'response'
    });
  }
  
  getMedicoId(id:string):Observable<HttpResponse<Colaboradores[]>>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Colaboradores[]>(this.url, {
      headers: headers,
      params: {
        termino: id
      },
      observe: 'response'
    });    
  }

  actualizar(colaborador:Colaboradores, id:string):Observable<HttpResponse<Colaboradores[]>>{
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(colaborador);
    body = '{'+body.substring(body.search('cedula')-1,body.length);
    
    return this.http.patch<Colaboradores[]>(this.url + id, body, {
      headers: headers,
      observe: 'response'
    })
  }

  eliminar(idEliminar:string){
    return this.http.delete(this.url+idEliminar, {observe: 'response'})
  }
}
