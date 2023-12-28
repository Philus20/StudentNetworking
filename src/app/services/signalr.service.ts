// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import * as signalr from '@microsoft/signalr'
// import { HubConnection,HubConnectionBuilder } from '@microsoft/signalr';
// @Injectable({
//   providedIn: 'root'
// })
// export class SignalrService {
  import { Injectable } from '@angular/core';
  import * as signalR from '@microsoft/signalr';
  import { Observable, Subject, map } from 'rxjs';
  import { HubConnection ,HubConnectionBuilder} from '@microsoft/signalr';
  import { HttpClient } from '@angular/common/http';
import { Register } from '../utils/IRegister';
  
  @Injectable({
    providedIn: 'root'
  })
  export class SignalrService {
    data:any[]=[]
    private hubConnection: HubConnection | undefined;
    private messageSubject = new Subject<{ user: string, message: string }>();
  
    constructor(private http: HttpClient) { }


getData() {
    return this.http.get("http://localhost:5293/Students")
      

  }
  postData(data: any) {
    // Assuming you want to send data in the request body
    return this.http.post('http://localhost:5293/Students', data);

  }

    //hub 
    startConnection(): void {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5293/chat') // Replace with your API URL
        .build();
  
      this.hubConnection.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.error('Error while starting connection: ', err));
  
      this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        this.messageSubject.next({ user, message });
      });
    }
  
    sendMessage(user: string, message: string): void {
      if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        this.hubConnection.invoke('SendMessage', user, message)
          .catch(err => console.error('Error while sending message: ', err));
      }
    }
  
    getMessageObservable(): Observable<{ user: string, message: string }> {
      return this.messageSubject.asObservable();
    }
  }
  
  //  hubConnection!:HubConnection
  // constructor(private http: HttpClient,) { }

  // getData(): Observable<any> {
  //   return this.http.get("http://localhost:5293/api/Register");
  // getData() {
  //   return this.http.get<Register[]>("http://localhost:5293/api/Register").pipe(
  //     map((res)=>{
  //       localStorage.setItem('valid', JSON.stringify(res[0]))
  //       return res[0];
  //     })
  //   );

  // }
  // }
  // postData(data: any): Observable<any> {
  //   // Assuming you want to send data in the request body
  //   return this.http.post('http://localhost:5293/api/Register', data);
  // }

//   createChatConnection(){
//     this.hubConnection = new HubConnectionBuilder()
//       .withUrl('http://localhost:5293/chat').build();

//     this.hubConnection.start().then(() => {
//       console.log('connection started');
//     }).catch(err => console.log(err));

//     this.hubConnection.onclose(() => {
//       debugger;
//       setTimeout(() => {
//         console.log('try to re start connection');
//         debugger;
//         this.hubConnection.start().then(() => {
//           debugger;
//           console.log('connection re started');
//           const user = 'John';
// const message = 'Hello from Angular!';
//           this.hubConnection.invoke('ReceiveMessage', user, message)
//           .catch(error => console.error(error));
//         }).catch(err => console.log(err));
//       }, 5000);
//     });
//   }
  

