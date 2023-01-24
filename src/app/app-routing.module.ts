import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './pages/editarInfo/editar.component';
import { LoginRegistrarComponent } from './pages/login-registrar/login-registrar.component';
import { PacientesInfoComponent } from './pages/pacientes-info/pacientes-info.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';

const routes: Routes = [
  {path: 'login', component: LoginRegistrarComponent},
  {path: 'recuperar-contrasenia', component: RecuperarPasswordComponent},
  {path: 'editar', component: EditarComponent},
  {path: 'registrar-paciente', component: PacientesComponent},
  {path: 'pacientes', component: PacientesInfoComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
