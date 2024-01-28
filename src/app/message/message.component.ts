import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Register } from '../utils/IRegister';
import { SignalrService } from '../services/signalr.service';
import { EmailService } from '../services/email.service';
import { ChatService } from '../services/chat.service';
import { Message } from '../utils/Message';
import { Chat2Service } from '../services/chat2.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  activeUser !:Register 
  baseUrl:string = 'http://localhost:5293/api/Files/'
  defaultProfile:string = 'uaer.png'
  user!: string;
    message!: string;
    messages: { name:string,user: string, message: string }[] = []
constructor(private sharedS:SharedService, private signalRService:SignalrService,public emailS:EmailService,public chatS:ChatService,private signalR1Service: Chat2Service){
  //this.chatS.createChatConnection()
  
  this.chatS.registerUser(this.emailS.userInformation.email).subscribe(
    {
      next:()=>{
        console.log("success full online user")
    },
    error:()=>{
      console.log("online user registration error")
    }
  })
  
}
toUser:string =""



ngOnInit(){
  this.signalR1Service.startConnection();
  this.signalR1Service.messageReceived.subscribe((message: {name:string, user: string, message: string }) => {
   this.messages.push(message)
  });
  //this.signalR1Service.addConnectionId(this.emailS.userInformation.email)
  this.sharedS.sharedActiveUser$.subscribe(
    data=>{
      
      this.activeUser = data;
      this.activeUserIsNull()
      
      
    }
    
    
  )
  setTimeout(() => {
    this.signalR1Service.sendMessage1(this.emailS.userInformation.email);
  }, 1000);
  
   
    }
    connect(){
      this.signalR1Service.addConnectionId(this.emailS.userInformation.email)
    }
    cont:string=''
    sendMessage() {
      
      this.signalR1Service.sendMessage(this.emailS.userInformation.email,this.activeUser.email, this.message);
    //  this.signalR1Service.sendMessage(this.emailS.userInformation.email, this.message);
    this.cont= this.message
      this.message = '';
    }
  
  
  

  // this.signalRService.startConnection();
  // this.signalRService.receiveMessage();

  // this.signalRService.getMessage().subscribe((message: any) => {
    
  //   this.chatMessages.push(message);
  // });
    
  
 
 

activeUserFirstName:string ='John '
  activeUserLastName:string ='doe'
  activeUserProfile :string ='http://localhost:5293/api/Files/uaer.png'
  
activeUserIsNull(){
if(Object.keys(this.activeUser).length > 0){
  this.activeUserFirstName= this.activeUser.firstName
  this.activeUserLastName = this.activeUser.surname
  //this.activeUserProfile = this.baseUrl+this.activeUser.profilePictureName
  this.activeUserProfile = this.baseUrl + this.activeUser.profilePictureName
}
else{
 
  

}

}


}
