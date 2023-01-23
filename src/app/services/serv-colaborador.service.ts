import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaboradores } from '../domain/colaboradores';

@Injectable({
  providedIn: 'root',
})
export class ServColaboradorService {
  private url = 'http://localhost:3000/colaboradores/';

  constructor(private http: HttpClient) {}

  registrar(colaborador: Colaboradores) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(colaborador);
    body = '{'+body.substring(body.search('cedula')-1,body.length);
    return this.http.post(this.url + 'registrar-colaborador', body, {
      headers: headers,
      observe: 'response',
    });
  }

  getColaboradores(){
    return this.http.get<Colaboradores[]>(this.url, {
      observe: 'response'
    });
  }
  
  getColaboradorId(id:string):Observable<HttpResponse<Colaboradores[]>>{
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
    // const headers = { 'content-type': 'application/json' };
    // let body = JSON.stringify(colaborador);
    // body = '{'+body.substring(body.search('cedula')-1,body.length);
    // console.log('ss',body);
    return this.http.delete(this.url+idEliminar, {observe: 'response'})
  }
}
