import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {environment}  from "../../Environments/environment"
import { User } from '../utils/User';
import {Message} from '../utils/Message'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
//import { error } from 'console';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myEmail:string='';
  onlineUsers:string[] = [];
  Messages:Message[]=[]
  privateMessages:Message[]=[]
  private chatConnection?:HubConnection
  privateMessageInitiated = false
onlineUserUrl = 'http://localhost:5293/'
  onlineUser!:User
  constructor(private http:HttpClient,private emailS:EmailService) { }

  registerUser(email:string) {
 const user:User ={
        
         
         UserName: this.emailS.userInformation.email
         

}

    return this.http.post(`${this.onlineUserUrl}api/onlineUsers/register-user`, user,{responseType:'text'});
  }
  ///api/onlineUsers/register-user
  createChatConnection(){
    this.chatConnection = new HubConnectionBuilder().withUrl(
      'http://localhost:5293/chat').withAutomaticReconnect().build();

    this.chatConnection.start().then(() => console.log('Connection started messaging')).catch(error =>{
      console.log("faile connection to signal Rr");
    });
    //  this.chatConnection.start().catch(error => {
    //   console.log(error);
     
    //  })
     this.chatConnection.on("UserConnected",()=>{
     
     this.addUserConnectionid();
    })
     this.chatConnection.on("OnlinUsers",(onlineUser)=>{
     this.onlineUsers = [...onlineUser];
     console.log("success full")
     console.log(this.onlineUsers)
    })

    this.chatConnection.on("NewMessage",(message:Message)=>{
      this.Messages = [...this.Messages,message]
    })
    this.chatConnection.on("OpenPrivateChat",(message:Message)=>{
      this.privateMessages = [...this.privateMessages,message]
      this.privateMessageInitiated=true;
      // const modalRef = this.modalService.open(PrivateChatComponent)
      // modalRef.componentInstance.toUser = message.from
    })
    this.chatConnection.on("NewPrivateMessage",(message:Message)=>{
      this.privateMessages = [...this.privateMessages,message]
    })
    this.chatConnection.on("ClosePrivateChat",()=>{
      this.privateMessages = [];
    //  this.modalService.dismissAll();
    })
  }
  stopChatConnection(){
    this.chatConnection?.stop().catch(error => console.log(error));
  }

  async addUserConnectionid(){

    return this.chatConnection?.invoke("AddUserConnectionId", this.myEmail).then(x=>console.log(this.myEmail+ "fjhf"))
    .catch(error => console.log(error));
    
  }

  async sendMessage(content: string) {
    // const message: Message = {
    //   enderEmail: this.myEmail,
    //   ReceiverEmail: 'd@gmail.com',
    //   Subject: content
    // };
  
    try {
      // await this.chatConnection?.invoke('ReceiveMessage', message);
      // Add any other logic you need after sending the message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async closePrivateChatMessage(other:string){
    return this.chatConnection?.invoke("RemovePrivateChat", this.myEmail,other).then(x=>console.log(this.myEmail+ "fjhf"))
    .catch(error => console.log(error));
  }
  sendPrivateMessage(to: string, content: string) {
    const message: Message = {
        senderEmail: this.myEmail,
        receiverEmail: to,
        subject:content
    };

    if (!this.privateMessageInitiated) {
        this.privateMessageInitiated = true;
        return this.chatConnection?.invoke("createPrivateChats", message)
            .then(() => {
                this.privateMessages = [...this.privateMessages, message];
                console.log(this.privateMessages)
            })
            .catch(error => console.log(error ));
    } else {
        return this.chatConnection?.invoke("RecievePrivateMessage", message).then
        (() => {
          this.privateMessages = [...this.privateMessages, message];
          console.log(this.privateMessages)
      })
            .catch(error => console.log(error));
    }

}
}

  