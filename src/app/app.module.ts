import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { LoginRegistrarComponent } from './pages/login-registrar/login-registrar.component';
import { MenuPagsComponent } from './pages/menu/menu-pags/menu-pags.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ColaboradoresComponent,
    DoctoresComponent,
    LoginRegistrarComponent,
    MenuPagsComponent,
    RecuperarPasswordComponent
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
