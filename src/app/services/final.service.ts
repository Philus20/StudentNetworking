// final.service.ts

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinalService {
  private hubConnection: signalR.HubConnection;
  public messageReceived = new Subject<{ fromUserId: string, message: string }>();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5293/chat') // Adjust the URL to match your SignalR hub endpoint
      .build();

    this.hubConnection.on("ReceiveMessage", (fromUserId, message) => {
      this.messageReceived.next({ fromUserId, message });
    });

    this.startConnection();
    this.handleConnectionEvents();
  }

  private startConnection() {
    this.hubConnection.start()
      .then(() => console.log('SignalR connected'))
      .catch(err => console.error('Error while starting SignalR connection: ', err));
  }

  private handleConnectionEvents() {
    this.hubConnection.onclose(error => {
      if (error) {
        console.error(`SignalR connection closed. Error: ${error.message}`);
        // You might want to handle reconnection logic here (retry, notify user, etc.)
      }
    });

    this.hubConnection.onreconnecting(error => {
      if (error) {
        console.log(`SignalR reconnecting. Error: ${error.message}`);
        // You might want to handle reconnecting logic here (notify user, etc.)
      }
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log(`SignalR reconnected. ConnectionId: ${connectionId}`);
      // You might want to handle reconnected logic here (notify user, etc.)
    });
  }

  public sendMessage(toUserId: string, message: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke("SendMessage", toUserId, message)

        .catch(err => console.error('Error while sending message: ', err));

        console.log("sent successfuly")
    } else {
      console.error('Cannot send message. Connection is not in the \'Connected\' state.');
      // Handle the situation when the connection is not in the 'Connected' state (retry, notify user, etc.)
    }
  }
}
