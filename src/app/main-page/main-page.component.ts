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
  constructor(private toastr:ToastrService ,private emailService:EmailService,private router:Router, private chatS:ChatService){
//toastr.success('Welcome','Login Successfull')  
///this.refreshingData()
          this.chatS.myEmail =   this.emailService.userInformation.email
  }
 refreshingData(){
  const loginData = localStorage.getItem('loginData');
const backEnd = localStorage.getItem('backEndData')
if (loginData && backEnd) {
  const loginUser: Register = JSON.parse(loginData);
  const backUser:Register = JSON.parse(backEnd)
  console.log(backUser)
console.log(loginUser)
 
   
    this.emailService.userInformation = backUser;
    if(!  this.emailService.checking(backUser.password, loginUser.password)){
      this.toastr.error("oops",'Mismatch Logins')
    }
    this.router.navigate(['/main']);
    
   
  } else {
    console.error('backEndData or its password property is undefined');
  }
 }
 me(){
  console.log('fjjj')
  localStorage.removeItem('loginData')
  
  this.router.navigate(['/log']);
 }
  ngOnInit(){
    //  const storedPassword = localStorage.getItem('e');
    //  const dbPassword = localStorage.getItem('p');
    //  if (storedPassword !== null && dbPassword !== null) {
    //    this.loginPass = storedPassword;
    //    this.dbPass = dbPassword;
    //  console.log(this.loginPass + this.dbPass + ' main ');
    // this.emailService.checking(this.dbPass, this.loginPass);
     // console.log('vaue:' + this.emailService.checkingRes);

    // this.data(this.loginPass,this.dbPass)
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
  


  
