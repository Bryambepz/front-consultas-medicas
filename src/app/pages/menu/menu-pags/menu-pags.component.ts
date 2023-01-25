import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu-pags',
  templateUrl: './menu-pags.component.html',
  styleUrls: ['./menu-pags.component.scss']
})
export class MenuPagsComponent {
  agendar:boolean = false;
  constructor(private route:Router){}
  citasAccion(){
    if(this.agendar){
      window.location.href = "/citas?cita=agendar";
    }else{
      window.location.href = "/citas?cita=listar";
    }
  }
}
