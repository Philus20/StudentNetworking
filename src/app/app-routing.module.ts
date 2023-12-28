import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path:'', component: RegisterComponent},
  {path:'log', component:LoginComponent},
  {path:'reg', component:RegisterComponent},
  {path:'main', component:MainPageComponent,canActivate:[AuthService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
