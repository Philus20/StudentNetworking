import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../utils/api-response';
import { Register } from '../utils/IRegister';

import { Login } from '../utils/Ilogin';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})


export class EmailService {
  student!: string; 
loginInfo:Register[]=[] ;
checkingRes!:Boolean
userInformation!:Register

api = "http://localhost:5293/Students"

  constructor(private http:HttpClient, private loginService:LoginService) {
    // this.student = ((localStorage.getItem('user')!));
    // const parsedUser: Register = JSON.parse(this.student);
    //     this.loginInfo =[ parsedUser]
    //     localStorage.clear
   
    

   
    
    //  console.log(this.loginInfo)
    //  console.log(this.loginService.nam)

   }
   

  getEmail(email: string) {
    const url = `${this.api}/${email}`;

    return this.http.get(url)
      
  }
   checking(bankendPassword:string, frontentPassword:string):boolean{
    if( bankendPassword==frontentPassword ){

      this.checkingRes=true
      console.log(this.userInformation)
return true
    }
    else{
      this.checkingRes=false
      return false
    }
   }
 // getUserById(pass1:string) {
  //   this.getEmail(email).subscribe({
  //     next: (data:any) => {
       
  //       this.loginInfo =[data]
  //         // Save user data to local storage
  //         localStorage.setItem('user', JSON.stringify(this.loginInfo));
           
  //         // Update the value of this.name
        
  //       //console.log(this.loginInfo)
  //       return this.loginInfo
        
  //     },
  //     error: (error) => {
  //       console.error('Error getting user:', error);
  //     }
  //   });
  // }

  
  
}
