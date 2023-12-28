import { Component } from '@angular/core';
import { NgForm,NgModel } from '@angular/forms';
import { Login } from '../utils/Ilogin';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Change styleUrl to styleUrls
})

export class LoginComponent {
  LoginData !: Login  // Initialize LoginData with default values
  backEndData !: Register
  data !:string

  constructor(private logins: LoginService,private route:Router,private  emailService:EmailService) { 
   
  }

  Login(f: NgForm) {
    this.LoginData = f.value;
  
    this.emailService.getEmail(this.LoginData.email).subscribe({
      next: (data: any) => {
        this.backEndData = data;
        console.log(data);
  
        // Check if backEndData is defined before accessing its properties
        if (this.backEndData && this.backEndData.password) {
          console.log(this.backEndData.password);
          console.log(this.LoginData.password)
this.emailService.userInformation=this.backEndData
          this.emailService.checking(this.backEndData.password,this.LoginData.password)

          
        } else {
          console.error('backEndData or its password property is undefined');
        }
  
        // Move the navigation logic here or use async/await
        this.route.navigate(['/main']);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        // Handle the error if needed
      }
    });
  }
  
  validations(f:NgModel){}
}
