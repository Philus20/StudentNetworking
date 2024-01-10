import { Component,Output,EventEmitter } from '@angular/core';
import { NgForm,NgModel } from '@angular/forms';
import { Login } from '../utils/Ilogin';
import { LoginService } from '../services/login.service';
import { Route, Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Change styleUrl to styleUrls
})

export class LoginComponent {
  LoginData !: Login  // Initialize LoginData with default values
  backEndData !: Register
  data !:string

  constructor(private logins: LoginService,private route:Router,private  emailService:EmailService ,private toastr:ToastrService,private sService: SharedService, private spinner: NgxSpinnerService) { 
   
  }

  Login(f: NgForm) {





    if(f.valid){
    this.LoginData = f.value;
  
    this.spinner.show();

    setTimeout(() => {
      this.emailService.getEmail(this.LoginData.email).subscribe({
        next: (data:any) => {
          this.backEndData = data;
          console.log(data);
          localStorage.setItem('fileRes', data.profilePictureName)
          if (this.backEndData && this.backEndData.password) {
            console.log(this.backEndData.password);
            console.log(this.LoginData.password);
            this.emailService.userInformation = this.backEndData;
            if(!this.emailService.checking(this.backEndData.password, this.LoginData.password)){
              this.toastr.error("oops",'Mismatch Logins')
            }
            this.route.navigate(['/main']);
          } else {
            console.error('backEndData or its password property is undefined');
          }
          
          // Move the spinner hide logic here
          this.spinner.hide();
        },
        error: (error) => {
          // Handle different types of errors
          if (error.status === 0) {
            console.error('No internet connection. Please check your network.');
            this.toastr.error('','No internet connection.')
          } else {
            console.error('Error fetching data:', error);
            // Handle other errors if needed
          }
    
          // Move the spinner hide logic here
          this.spinner.hide();
        }
      });
    }, 100);

  }
  else{
    this.toastr.error('','user details required')
  }

}
  
  validations(f:NgModel){}
}
