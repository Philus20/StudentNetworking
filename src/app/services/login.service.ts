import { Injectable } from '@angular/core';
import { Login } from '../utils/Ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoginInfo: Login | null;
email!:string

  constructor() {
    this.userLoginInfo = null;
  }

  setUserLoginInfo(loginData: Login) {

    this.userLoginInfo = loginData;
    //this.nam = this.userLoginInfo.email
  }
}
