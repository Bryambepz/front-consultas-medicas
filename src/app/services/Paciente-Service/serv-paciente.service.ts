import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaboradores } from 'src/app/domain/colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ServPacienteService {
  private url = 'http://localhost:3000/pacientes/';

  constructor(private http: HttpClient) {}

  registrar(colaborador: Colaboradores) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(colaborador);
    body = '{'+body.substring(body.search('cedula')-1,body.length);
    body = body.substring(0, body.search('contrasenia')-2) + body.substring(body.search('fechaNacimiento')-2, body.length-1)+'}';
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getPacientes():Observable<HttpResponse<Colaboradores[]>>{
    return this.http.get<Colaboradores[]>(this.url, {
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
