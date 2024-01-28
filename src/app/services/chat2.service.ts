import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Chat2Service {
  private hubConnection!: signalR.HubConnection;
  messageReceived = new Subject<{ name:string, user: string, message: string }>();

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5293/signal')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (name,user, message) => {
      this.messageReceived.next({ name,user, message });
    });
    this.hubConnection.on('ReceiveMessage1', (user) => {
      
    });
  }

  sendMessage(name:string,user: string, message: string) {
    this.hubConnection.invoke('SendMessage', name,user, message)
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
