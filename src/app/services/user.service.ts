import { Injectable } from '@angular/core';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firstName : string='';
  email:string='';
  password:string=''
  surname:string=''
  constructor(private emailS:EmailService) { 

    this.firstName= this.emailS.loginInfo[0].firstName
    this.email= this.emailS.loginInfo[0].email
    this.password= this.emailS.loginInfo[0].password
    this.surname= this.emailS.loginInfo[0].surname
  }
}
