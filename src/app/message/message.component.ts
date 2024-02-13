import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Register, TopChatAddCounting } from '../utils/IRegister';
import { SignalrService } from '../services/signalr.service';
import { EmailService } from '../services/email.service';
import { ChatService } from '../services/chat.service';
import { Message } from '../utils/Message';
import { Chat2Service } from '../services/chat2.service';
import { ShowMessage } from '../utils/ShowMessage';
import { Router } from '@angular/router';
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
    messages: { name:string,user: string, message: string }[] = [];
    receiver!:boolean;
    sender!:boolean;
    cont1!:string;
    cont2!:string
    disMess:ShowMessage	[]=[]
    backendMessages:Message[]=[]
    topChats2:TopChatAddCounting[]=[]
    topChats:Register[]=[];
  b:Message[]=[]
    
constructor(private sharedS:SharedService, private signalRService:SignalrService,public emailS:EmailService,public chatS:ChatService,
  private signalR1Service: Chat2Service,private router:Router){
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
  
  
 this.emailS.topChats$.subscribe({
  next: (data)=>{
    this.topChats2 = data
    console.log(11111111111111111111111111111)
    console.log(this.topChats2)
  },
  error:(r)=>{
    console.log(r)
  }
 })
  
 this.getTopChats()
}
toUser:string =""

people!:boolean;

ngOnInit(){
  this.signalR1Service.startConnection();
  this.signalR1Service.messageReceived.subscribe((message: {name:string, user: string, message: string }) => {
   this.messages.push(message);
   const mess:ShowMessage = {
    senderEmail:this.emailS.userInformation.email,
    receiverEmail:this.activeUser.email,
     subject :message.message ,
   status:"1",
    
   user:false

 }
 
 this.disMess.push(mess)
this.emailS.disMess = this.disMess;
  
  });
  //this.signalR1Service.addConnectionId(this.emailS.userInformation.email)
  this.sharedS.sharedActiveUser$.subscribe(
    data=>{
      
      this.activeUser = data;
      this.activeUserIsNull()
      
      
    }
    
   
  )
 
 // subscribing to get message updated
  this.emailS.sendMes$.subscribe({
    next: (data)=>{
      this.disMess = data;
      
    }
  })
  setTimeout(() => {
    this.signalR1Service.sendMessage1(this.emailS.userInformation.email);
  }, 1000);
  
   
    }
    connect(){
      this.signalR1Service.addConnectionId(this.emailS.userInformation.email)
    }
    cont:string=''
    sendMessage() {

      const newMessage:Message={
        senderEmail:this.emailS.userInformation.email,
        receiverEmail:this.activeUser.email,
        subject:this.message,
        status:'0',
        time:new Date()
      }


      if(this.activeUser.email == newMessage.senderEmail){
        const mess:ShowMessage = {
           senderEmail:newMessage.senderEmail,
           receiverEmail:newMessage.receiverEmail,
            subject :newMessage.subject ,
          status:newMessage.status,
           time:newMessage.time,
          user:false

        }
        console.log(mess)
        this.disMess.push(mess)
    }
    else {
      const mess:ShowMessage = {
        senderEmail:newMessage.senderEmail,
        receiverEmail:newMessage.receiverEmail,
         subject :newMessage.subject ,
       status:newMessage.status,
        time:newMessage.time,
       user:true

     }
         this.disMess.push(mess)

    }
    this.emailS.sendMess.next(this.disMess)
      this.emailS.postMessag(newMessage).subscribe({
        next: x=>{
        console.log('message sent to the database successful')
    },
  error: x=>{
    console.log(x)
  }})
      this.signalR1Service.sendMessage(this.emailS.userInformation.email,this.activeUser.email, this.message);
      
      
      // this.getMessage(this.emailS.userInformation.email)
    //  this.signalR1Service.sendMessage(this.emailS.userInformation.email, this.message);
    this.cont= this.message
      
       

      this.message = '';
    }
  
    
    private getMessage(email:string, active:string){
      this.emailS.getMessage(email,active).subscribe({
        next: (data:any)=>{
             this.emailS.backendMessages =data;
             for(let mes of this.emailS.backendMessages){
              if(this.activeUser.email == mes.senderEmail){
                  const mess:ShowMessage = {
                     senderEmail:mes.senderEmail,
                     receiverEmail:mes.receiverEmail,
                      subject :mes.subject ,
                    status:mes.status,
                     time:mes.time,
                    user:false
      
                  }
                  console.log(mess)
                  this.emailS.disMess.push(mess)
              }
              else {
                const mess:ShowMessage = {
                  senderEmail:mes.senderEmail,
                  receiverEmail:mes.receiverEmail,
                   subject :mes.subject ,
                 status:mes.status,
                  time:mes.time,
                 user:true
      
               }
               this.emailS.disMess.push(mess)
              }
             }
             this.emailS.sendMess.next(this.emailS.disMess);
  //console.log(data)
        }
      })
    }
  
    navigateToRight(){
      this.router.navigate(['/right'])
    }
    
 

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

getTopChats(){
  this.emailS.getTopChats(this.emailS.userInformation.id).subscribe({
    next:(data:any)=>{
      this.topChats=data
           

    }
  })


  for(let user of this.topChats){
    
    
    this.emailS.getMessage(this.emailS.userInformation.email,user.email).subscribe({
      next: (data:any)=>{
        this.b = []
           this.backendMessages=data
           this.emailS.backendMessages.push(data)
          
           console.log(this.backendMessages[0])
           for(let message of  this.backendMessages ){
           
            if((message.receiverEmail == this.emailS.userInformation.email && message.senderEmail==user.email)&& message.status=="0"){
                this.b.push(message)
          }
         
          }
          const User:TopChatAddCounting={
            id:user.id,
            firstName:user.firstName,
            surname:user.surname,
            profilePictureName:user.profilePictureName,
            unread:this.b.length
          }
          console.log(User.unread)
          this.topChats2.push(User)
        
    },
    error:(r)=>{
      console.log(r)
   } })
  




  }
  this.emailS.emitTopchats(this.topChats2)
 }

}
