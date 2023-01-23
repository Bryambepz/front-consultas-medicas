import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { LoginRegistrarComponent } from './pages/login-registrar/login-registrar.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';

const routes: Routes = [
  {path: 'login', component: LoginRegistrarComponent},
  {path: 'colaboradores', component: ColaboradoresComponent},
  {path: 'recuperar-contrasenia', component: RecuperarPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
