import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MainPageComponent } from './main-page/main-page.component';
import { PostsComponent } from './posts/posts.component';
import { PendingComponent } from './pending/pending.component';

const routes: Routes = [
 // {path:'', component: MainPageComponent},
  {path:'log', component:LoginComponent},
  {path:'reg', component:RegisterComponent},
 // {path:'main', component:MainPageComponent},
   {path:'main', component:MainPageComponent,canActivate:[AuthService]},
  {path:'posts', component:PostsComponent},
{path:'mes',component:PendingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
