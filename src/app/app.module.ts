import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditarComponent } from './pages/editarInfo/editar.component';
// import { DoctoresComponent } from './pages/doctores/doctores.component';
import { LoginRegistrarComponent } from './pages/login-registrar/login-registrar.component';
import { MenuPagsComponent } from './pages/menu/menu-pags/menu-pags.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { PacientesInfoComponent } from './pages/pacientes-info/pacientes-info.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { GestionConsultasComponent } from './pages/gestion-consultas/gestion-consultas.component';
import { ComprobanteComponent } from './pages/comprobante/comprobante.component';
import { GestionComprobantesComponent } from './pages/gestion-comprobantes/gestion-comprobantes.component';

@NgModule({
  declarations: [
    AppComponent,
    EditarComponent,
    LoginRegistrarComponent,
    MenuPagsComponent,
    RecuperarPasswordComponent,
    PacientesComponent,
    PacientesInfoComponent,
    CitasComponent,
    ConsultasComponent,
    GestionConsultasComponent,
    ComprobanteComponent,
    GestionComprobantesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
