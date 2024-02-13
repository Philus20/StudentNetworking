import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';
import { SignalrService } from './signalr.service';
import { Register } from '../utils/IRegister';
import { EmailService } from './email.service';
import { LoginComponent } from '../login/login.component';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  dataReturned!: Register
  loginPass:string=''
  dbPass:string = ''
  
  constructor( private signal:SignalrService,private emailservice:EmailService, private loginService:LoginService, private router:Router) { 
   
   
  }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    
     if(this.emailservice.checkingRes){
      console.log(this.emailservice.checkingRes)
      return true;
    } else {
      console.log('password mismatch');
      
        this.router.navigate(['/log']);
      
      return false
    }
  }
  
}
