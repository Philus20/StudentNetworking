import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Component({
  selector: 'app-l',
  templateUrl: './l.component.html',
  styleUrl: './l.component.css'
})
export class LComponent {
email:string = ''
password:string= "";
constructor(private auth : FirebaseAuthService){

}

login(){
  this.auth.login(this.email,this.password)
  this.email=""
  this.password= ''
}
}
