import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/email.service';
import { AuthService } from '../services/auth.service';
import { Login } from '../utils/Ilogin';
import { Register } from '../utils/IRegister';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  loginPass:string = '';
  dbPass:string = '';
  LoginData !: Login  // Initialize LoginData with default values
  backEndData !: Register
  showPage!:boolean;
  constructor(private toastr:ToastrService ,private emailService:EmailService,private router:Router, private chatS:ChatService){

this.chatS.myEmail =   this.emailService.userInformation.email
  
  }
  

  ngOnInit(){
    this.emailService.getEmail(this.emailService.userInformation.email).subscribe({
      next: (x) => {
        this.showPage = true
      },
      error:(err)=>{
        if(err.status==0){
          this.showPage = false;
        }
      }
    }
    )
  }

}

  
    
    
// data(email:string,password:string){
//   this.emailService.getEmail(email).subscribe({
//     next: (data:any) => {
//       this.backEndData = data;
//       console.log(data);
//       localStorage.setItem('fileRes', data.profilePictureName)
     
//       if (this.backEndData && this.backEndData.password) {
//         console.log(this.backEndData.password);
//         console.log(this.LoginData.password);
//         this.emailService.userInformation = this.backEndData;
//         if(!  this.emailService.checking(this.backEndData.password, password)){
//           this.toastr.error("oops",'Mismatch Logins')
//         }
        //localStorage.setItem('loginPassword', this.LoginData.password);
      //   localStorage.setItem('userPass', this.emailService.userInformation.password);
      //   this.route.navigate(['/main']);
       
      // } else {
      //   console.error('backEndData or its password property is undefined');
      // }
      
      // Move the spinner hide logic here
     
    //},
  //   error: (error) => {
  //     Handle different types of errors
  //     if (error.status === 0) {
  //       console.error('No internet connection. Please check your network.');
  //       this.toastr.error('','No internet connection.')
  //     } else {
  //       console.error('Error fetching data:', error);
  //        Handle other errors if needed
  //     }

  //      Move the spinner hide logic here
     
  //   }
  // });
//}
  


  
