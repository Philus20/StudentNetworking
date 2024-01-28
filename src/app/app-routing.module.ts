import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MainPageComponent } from './main-page/main-page.component';
import { PostsComponent } from './posts/posts.component';
import { PendingComponent } from './pending/pending.component';
import { MessageComponent } from './message/message.component';
import { LComponent } from './l/l.component';
import { RComponent } from './r/r.component';

const routes: Routes = [
 //{path:'', component: MainPageComponent},
  {path:'log', component:LoginComponent},
  {path:'reg', component:RegisterComponent},
 // {path:'main', component:MainPageComponent},
   {path:'main', component:MainPageComponent,canActivate:[AuthService] },

  {path:'posts', component:PostsComponent},
{path:'mes',component:MessageComponent},
{path:'',component:LoginComponent},
{path:'l',component:LComponent},
{path:'r',component:RComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
