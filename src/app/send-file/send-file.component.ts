// import { Component } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { SharedService } from '../services/shared.service';
// import { EmailService } from '../services/email.service';
// import { Register } from '../utils/IRegister';
// import { Message } from '../utils/Message';
// import { Chat2Service } from '../services/chat2.service';

// @Component({
//   selector: 'app-send-file',
//   templateUrl: './send-file.component.html',
//   styleUrls: ['./send-file.component.css']
// })
// export class SendFileComponent {
//   imageToShow: string | ArrayBuffer | null = null;
//   videoToShow: string | ArrayBuffer | null = null;
//   fileData: File | null = null;
//   isImage: boolean = false;
//   sendingStatus: string = '';
//   message: string = '';
//   newMessage!: Message;
//   activeUser!: Register;

//   constructor(
//     public modal: NgbActiveModal,
//     private sharedS: SharedService,
//     private emailS: EmailService,
//     private chat2: Chat2Service
//   ) {
//     this.sharedS.shareImage$.subscribe(imageData => {
//       this.imageToShow = imageData;
//       this.isImage = true;
//     });

//     this.sharedS.sharevideo$.subscribe(videoData => {
//       this.videoToShow = videoData;
//       this.isImage = false;
//     });

//     // // this.sharedS.shareFileData$.subscribe(file => {
//     // //   this.fileData = file;
//     // });

//     this.sharedS.sharedActiveUser$.subscribe(activeUser => {
//       this.activeUser = activeUser;
//     });
//   }

//   sendFileToDatabase() {
//     if (this.fileData) {
//       const senderEmail = this.emailS.userInformation.email;
//       const receiverEmail = this.activeUser.email;
//       const messageType = this.isImage ? 'image' : 'video';

//       this.sharedS.postImageToDatabase(this.fileData, senderEmail, receiverEmail, this.message, messageType)
//         .subscribe(
//           (response: Message) => {
//             this.newMessage = response;
//             this.chat2.fileMessage.next(this.newMessage);
//             this.sendingStatus = `${messageType.charAt(0).toUpperCase() + messageType.slice(1)} sent successfully!`;
//           },
//           error => {
//             console.error(`Error uploading ${messageType}:`, error);
//             this.sendingStatus = `Failed to send ${messageType}.`;
//           }
//         );
//     }

//     this.modal.dismiss();
//   }
// }



import { Component ,Input} from '@angular/core';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { Register, TopChatAddCounting } from '../utils/IRegister';
import { Message } from '../utils/Message';
import { SignalrService } from '../services/signalr.service';
import { Chat2Service } from '../services/chat2.service';
@Component({
  selector: 'app-send-file',
  templateUrl: './send-file.component.html',
  styleUrl: './send-file.component.css'
})
export class SendFileComponent {
  imageToShow: string | ArrayBuffer | null = null;
  videoToShow: string | ArrayBuffer | null = null;
  result: string | ArrayBuffer | null = null;
  message!:string
newM!:Message
  fileData: File| null = null; // Holds the image or video data
 isImage: boolean = false; // Indicates if the file is an image
 sendingStatus: string = ''; // Holds the status of the sending process

  
  



  activeUser !:Register 


  constructor(public modal : NgbActiveModal, 
    private sharedS: SharedService,
    private emailS:EmailService,
    private chat2:Chat2Service
    ){


      this.sharedS.shareImage$.subscribe(imageData => {
              this.imageToShow = imageData;
              this.isImage = true;
            });
        
            this.sharedS.sharevideo$.subscribe(videoData => {
              this.videoToShow = videoData;
              this.isImage = false;
            });
          
//getting the video
//     this.sharedS.sharevideo$.subscribe({
//   next: (d)=>{
//     console.log(d)
//     this.videoToShow = d
//   }
// })

//getting the image
// this.sharedS.shareImage$.subscribe({
//   next: (d)=>{
//     //console.log(d)

//     this.imageToShow=d
    
//   }
// })
//giving the file date a value
this.sharedS.shareF$.subscribe({
  next:(data)=>{
    this.fileData = data
  },
  error:(err)=>{
    console.log(err)
  }
})
//assigning value to is image
  this.sharedS.isImage$.subscribe({
    next: x=>{
      this.isImage = x
    }
  })

  
  this.sharedS.sharedActiveUser$.subscribe(
    {
   next: data=>{
      
      this.activeUser = data;
      console.log(this.activeUser)
      console.log(55555555)
     // this.activeUserIsNull()
      
      
    },
    error: err=>{
      console.log(err)
    }
    })
   
  
  }

  ngOninit(){
   // this.chat2.startConnection();
  }
  content:string=''

  sendFileToDatabase() {

    if (this.fileData) {
      if (this.isImage) {
//getting active user



      this.sharedS.postImageToDatabase(this.fileData,this.emailS.userInformation.email,this.activeUser.email,this.message,"0").subscribe({
        next:  (response) => {
            console.log('Image uploaded successfully:', response);
             this.newM=  response
             this.chat2.fileMessage.next(this.newM)
            this.sendingStatus = 'Image sent successfully!';
          },
          error: (error) => {
            console.error('Error uploading image:', error);
            this.sendingStatus = 'Failed to send image.';
          }
      });
      } else {
        this.sharedS.postVideoToDatabase(this.fileData,this.emailS.userInformation.email,this.activeUser.email,this.message,"0").subscribe(
         { next:(response) => {
            console.log('Video uploaded successfully:', response);
            this.sendingStatus = 'Video sent successfully!';
          },
          error:(error) => {
            console.error('Error uploading video:', error);
            this.sendingStatus = 'Failed to send video.';
          }
         } );
      }
    }
    //Close the modal after sending the file
    this.modal.dismiss()
  }
}