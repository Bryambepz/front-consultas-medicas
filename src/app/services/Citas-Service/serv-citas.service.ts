import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Citas } from 'src/app/domain/citas';

@Injectable({
  providedIn: 'root'
})
export class ServCitasService {
  private url = 'http://localhost:3000/citas/'

  constructor(private http: HttpClient) { }

  crear(citas: Citas) {
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(citas);
    body = '{'+body.substring(body.search('fechaHoraEntrada')-1,body.length);
    
    return this.http.post(this.url, body, {
      headers: headers,
      observe: 'response',
    });
  }

  getCitas(){
    return this.http.get<Citas[]>(this.url, {
      observe: 'response'
    });
  }
  
  getCitasId(id:string):Observable<HttpResponse<Citas[]>>{
    const headers = { 'content-type': 'application/json' };
    return this.http.get<Citas[]>(this.url, {
      headers: headers,
      params: {
        termino: id
      },
      observe: 'response'
    });    
  }

  actualizar(citaUpd:Citas):Observable<HttpResponse<Citas[]>>{
    const headers = { 'content-type': 'application/json' };
    let body = JSON.stringify(citaUpd);
    body = '{'+body.substring(body.search('fechaHoraEntrada')-1,body.length);
    
    return this.http.patch<Citas[]>(this.url + citaUpd.id, body, {
      headers: headers,
      observe: 'response'
    })
  }

  eliminar(idEliminar:string){
    return this.http.delete(this.url+idEliminar, {observe: 'response'})
  }
}
