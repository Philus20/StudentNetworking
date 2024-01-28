import { Component } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Chat2Service } from '../services/chat2.service';

@Component({
  selector: 'app-r',
  templateUrl: './r.component.html',
  styleUrl: './r.component.css'
})
export class RComponent {
email:string=""
password:string = ""

user:string=''
messages: { user: string, message: string }[] = [];
message:string=''
constructor (private auth:FirebaseAuthService, public chat2:Chat2Service) {


console.log("hello")

}
ngOnInit() {
  //this.chat2.createChatConnection();
  this.chat2.messageReceived.subscribe((message) => {
    this.messages.push(message);
  });
}

sendMessage() {
  //this.chat2.sendAll(this.message, this.user);
  this.message = '';
}

register(){
  // this.auth.register(this.email,this.password)
 // this.chat2.sendAll(this.message,this.user)
 // console.log(this.chat2.messages)
}




}
