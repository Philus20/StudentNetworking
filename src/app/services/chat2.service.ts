import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { Message } from '../utils/Message';

@Injectable({
  providedIn: 'root'
})
export class Chat2Service {
  private hubConnection!: signalR.HubConnection;
  // messageReceived = new Subject<{ name:string, user: string, message: string}>();
  messageReceived = new Subject<Message>();
  fileMessage = new Subject<Message>();
  fileMessage$= this.fileMessage.asObservable() 
  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5293/signal')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', ( message) => {
      console.log("received")
      this.messageReceived.next(message);
    });
    this.hubConnection.on('ReceiveMessage1', (user) => {
      
    });
  }

  sendMessage(message:Message) {
    this.hubConnection.invoke('SendMessage',  message).then(x=>console.log("sent"))
      .catch(err => console.error(err));
  }
  async sendMessage1(user: string) {
    await this.hubConnection.invoke('SendMessage1', user).then(
      x=> console.log("seeeeeeeeeeeeeeeeeeeeeeeeent")
    )
      .catch(err => console.error(err));
  }

  addConnectionId(email:string){
    return this.hubConnection.invoke(' AddUserConnectionId',email).then(x=>
      console.log("  added user connection id")).catch(x=>
        console.log("errror happen while  add user connection id" + x))
  }
}
