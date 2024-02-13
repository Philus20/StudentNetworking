// app.component.ts

import { Component } from '@angular/core';
import { FinalService } from './services/final.service';
import {Chat2Service} from './services/chat2.service'
import { EmailService } from './services/email.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user!: string;
  message!: string;
  messages: { user: string, message: string }[] = [];
  tab!:boolean;

  constructor(private signalRService: Chat2Service,private emailS:EmailService) { 
this.emailS.errorNum$.subscribe(x=>{
if(x==0 || x==1){
 this.tab=false
}

})

  }

  ngOnInit() {
    //this.signalRService.startConnection();
//    this.signalRService.messageReceived.subscribe((message: { user: string, message: string }) => {
//     this.messages.push(message)
//   // Your code handling the message
// });
  }

  // sendMessage() {
  //   this.signalRService.sendMessage(this.user, this.message);
  //   this.message = '';
  // }

}
