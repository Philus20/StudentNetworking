
// export class ChatComponent implements OnInit {
  

//   constructor(private serve: SignalrService) {}

//   public ngOnInit() {
//     this.serve.createChatConnection()
//     console.log("sfkjlddddddddddd")

//     this.serve.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
//       console.log('Received Message - User:', user, 'Message:', message);
//   });

 
    
//   }
  
//   onSubmit(f:NgForm){
//     console.log(f.value)
//   }
// }



//import { Component, OnInit } from '@angular/core';
//import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
// import { SignalrService } from '../services/signalr.service';
// //import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { NgForm } from '@angular/forms';
// import { HubConnection,HubConnectionBuilder } from '@microsoft/signalr';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent {
//   hubConnection: signalR.HubConnection;
//   receivedData: any = {}; // Update the type based on your data structure

//   constructor() {
//     this.hubConnection = new HubConnectionBuilder()
//       .withUrl('http://localhost:5293/chat') // Update with your API URL
//       .build();

//     this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
//       this.receivedData = { user, message };
//     });

//     this.hubConnection.start().then(() => {
//       console.log('Connection started');
//     }).catch(err => console.error('Error while starting connection: ' + err));
//   }
// }




import { Component, OnInit } from '@angular/core';

import { SignalrService } from '../services/signalr.service';

@Component({
  selector: 'app-chat',
   templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export  class ChatComponent implements OnInit {
  user = 'YourUsername'; // Set the default username
  message = '';
  chatHistory: { user: string, message: string }[] = [];

  constructor(private chatService: SignalrService) {}

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.getMessageObservable().subscribe(msg => this.chatHistory.push(msg));

  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
       this.chatService.sendMessage(this.user, this.message);
      this.message = '';
    }
  }
}
