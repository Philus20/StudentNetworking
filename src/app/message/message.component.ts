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
import { ImageService } from '../services/image.service';
import { FileRes } from '../utils/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendFileComponent } from '../send-file/send-file.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { FilesService } from '../services/files.service';
import { FileDownloadService } from '../services/file-download.service';
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
    // messages: { name:string,user: string, message: string }[] = [];
    messages: Message[] = [];
    newM!:Message
    receiver!:boolean;
    sender!:boolean;
    cont1!:string;
    cont2!:string
    disMess:ShowMessage	[]=[]
    backendMessages:Message[]=[]
    topChats2:TopChatAddCounting[]=[]
    topChats:Register[]=[];
  b:Message[]=[]
  filename:string = ''
  fileUrlVx:string=''
  fileUrlImg:string=''
base:string='http://localhost:5293/api/FileMessage/'
  showImage!:boolean
   
    
constructor(
  private sharedS:SharedService,
   private signalRService:SignalrService,
   public emailS:EmailService,
   public chatS:ChatService,
  private signalR1Service: Chat2Service,
  private router:Router,
  private imageService: ImageService,
  private modal:NgbModal,
  private spinner: NgxSpinnerService,
  private fileService:FileDownloadService
  
  ){
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
  
  },
  error:(r)=>{
    console.log(r)
  }
 })
 this.topChats=[]
 this.getTopChats()
}
// toUser:string =""

// people!:boolean;

ngOnInit(){
  this.signalR1Service.startConnection();
  this.signalR1Service.fileMessage$.subscribe({
    next:(response)=>{
      this.newM=response
      
//pushing messages where user is true into the dismess array


  if(this.newM.isFile=="1"){
     if(this.newM.file && this.newM.ext   &&this.newM.id){
      if(this.newM.ext=="image"){
    const mess:ShowMessage = {
      id:this.newM.id,
       senderEmail:this.newM.senderEmail,
       receiverEmail:this.newM.receiverEmail,
        subject :this.newM.subject ,
      status:this.newM.status,
      fileDisplay:true,
      file:this.newM.file,
      isFile:this.newM.file,
       time:this.newM.time,
       ext:this.newM.ext,
      user:true,
      //i:true,
      index:this.disMess.length,
      fileUrl:`http://localhost:5293/api/FileMessage/${this.newM.file}`


    }
    this.disMess.push(mess)
   
  }
 else if(this.newM.ext=="video"){
    const mess:ShowMessage = {
      id:this.newM.id,
       senderEmail:this.newM.senderEmail,
       receiverEmail:this.newM.receiverEmail,
        subject :this.newM.subject ,
      status:this.newM.status,
      fileDisplay:true,
      file:this.newM.file,
      isFile:this.newM.file,
       time:this.newM.time,
       ext:this.newM.ext,
      user:true,
     // v:true,
      index:this.disMess.length,
      fileUrl:`http://localhost:5293/api/FileMessage/${this.newM.file}`


    }
    
  }
  else{
    const mess:ShowMessage = {
      id:this.newM.id,
       senderEmail:this.newM.senderEmail,
       receiverEmail:this.newM.receiverEmail,
        subject :this.newM.subject ,
      status:this.newM.status,
      fileDisplay:true,
      file:this.newM.file,
      isFile:this.newM.file,
       time:this.newM.time,
       ext:this.newM.ext,
      user:true,
      download:true,
      d:true,
      index:this.disMess.length,
      fileUrl:`http://localhost:5293/api/FileMessage/${this.newM.file}`


    }
    
  }
  }
  }

  //End of the nested if 

  //starting the else
  else{
    if(this.newM.id){
    const mess:ShowMessage = {
      id:this.newM.id,
      senderEmail:this.newM.senderEmail,
      receiverEmail:this.newM.receiverEmail,
      subject :this.newM.subject ,
      status:this.newM.status,
      fileDisplay:false,
      file:this.newM.file,
      isFile:this.newM.file,
       time:this.newM.time,
      
      user:true,
      index:this.disMess.length,
      fileUrl:`http://localhost:5293/api/FileMessage/${this.newM.file}`


    }
    this.disMess.push(mess)

    //this.emailService.disMess.push(mess)
  }
  }


      //this.disMess.push()
      
      //console.log(this.this.newM)
    
        this.signalR1Service.sendMessage(this.newM);
    
     
      console.log(123)
    }
  })


  this.signalR1Service.messageReceived.subscribe({
    next:(message:Message) => {
    console.log("recieve")
   //this.messages.push(message);
   console.log("moda")

   if(message.id){
    if(this.activeUser.email == message.senderEmail){
      if(message.isFile=="1"){
        if(message.file && message.ext &&message.id){
          if(message.ext)
          if(message.ext == "image"){
          //  console.log(message)
          const mess:ShowMessage = {
            id:message.id,
           senderEmail:message.senderEmail,
           receiverEmail:message.receiverEmail,
            subject :message.subject ,
          status:message.status,
          fileDisplay:true,
          file:message.file,
          isFile:message.file,
           time:message.time,
           ext:message.ext,
          user:false,
         // i:true,
          index:(this.disMess.length),
          fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`

        }
        console.log(mess)
        console.log(333)
        this.disMess.push(mess)
      }

      else if(message.ext == "video"){
        const mess:ShowMessage = {
          id:message.id,
         senderEmail:message.senderEmail,
         receiverEmail:message.receiverEmail,
          subject :message.subject ,
        status:message.status,
        fileDisplay:true,
        file:message.file,
        isFile:message.file,
         time:message.time,
         ext:message.ext,
        user:false,
       // v:true,
        index:(this.disMess.length),
        fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


      }
      this.disMess.push(mess)
    }

    else {
      const mess:ShowMessage = {
        id:message.id,
       senderEmail:message.senderEmail,
       receiverEmail:message.receiverEmail,
        subject :message.subject ,
      status:message.status,
      fileDisplay:true,
      file:message.file,
      isFile:message.file,
       time:message.time,
       ext:message.ext,
      user:false,
      download:true,
      d:true,
      fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`,
      index:(this.disMess.length)


    }
    this.disMess.push(mess)
  }
      }
      }

      //End of the nested if 

      //starting the else
      else{
        if(   message.id){
          const mess:ShowMessage = {
            id:message.id,
           senderEmail:message.senderEmail,
           receiverEmail:message.receiverEmail,
            subject :message.subject ,
          status:message.status,
          fileDisplay:false,
          
          isFile:message.file,
           time:message.time, 
          
          user:false,
          index:(this.disMess.length),
          fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


        }
        this.disMess.push(mess)
      }
      }
      //end of the nested else
    }
    // else {
    //   if(message.isFile=="1"){
    //      if(message.file && message.ext   &&message.id){
    //       if(message.ext=="image"){
    //     const mess:ShowMessage = {
    //       id:message.id,
    //        senderEmail:message.senderEmail,
    //        receiverEmail:message.receiverEmail,
    //         subject :message.subject ,
    //       status:message.status,
    //       fileDisplay:true,
    //       file:message.file,
    //       isFile:message.file,
    //        time:message.time,
    //        ext:message.ext,
    //       user:true,
    //       //i:true,
    //       index:(this.disMess.length-1),
    //       fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


    //     }
    //     this.disMess.push(mess)
    //   }
    //  else if(message.ext=="video"){
    //     const mess:ShowMessage = {
    //       id:message.id,
    //        senderEmail:message.senderEmail,
    //        receiverEmail:message.receiverEmail,
    //         subject :message.subject ,
    //       status:message.status,
    //       fileDisplay:true,
    //       file:message.file,
    //       isFile:message.file,
    //        time:message.time,
    //        ext:message.ext,
    //       user:true,
    //      // v:true,
    //       index:(this.disMess.length-1),
    //       fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


    //     }
    //     this.disMess.push(mess)
    //   }
    //   else{
    //     const mess:ShowMessage = {
    //       id:message.id,
    //        senderEmail:message.senderEmail,
    //        receiverEmail:message.receiverEmail,
    //         subject :message.subject ,
    //       status:message.status,
    //       fileDisplay:true,
    //       file:message.file,
    //       isFile:message.file,
    //        time:message.time,
    //        ext:message.ext,
    //       user:true,
    //       download:true,
    //       d:true,
    //       index:(this.disMess.length-1),
    //       fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


    //     }
    //     this.disMess.push(mess)
    //   }
    //   }
    //   }

    //   //End of the nested if 

    //   //starting the else
    //   else{
    //     if(message.id){
    //     const mess:ShowMessage = {
    //       id:message.id,
    //       senderEmail:message.senderEmail,
    //       receiverEmail:message.receiverEmail,
    //       subject :message.subject ,
    //       status:message.status,
    //       fileDisplay:false,
    //       file:message.file,
    //       isFile:message.file,
    //        time:message.time,
          
    //       user:true,
    //       index:(this.disMess.length-1),
    //       fileUrl:`http://localhost:5293/api/FileMessage/${message.file}`


    //     }
    //     this.disMess.push(mess)
    //   }
    //   }
    // }
  
 
 //this.disMess.push(message)
 //this.emailS.disMess = this.disMess;
}

  
  },
error:(err)=>{
  console.log("nothing was received")
}
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

  //get file name 
  // this.sharedS.imageName$.subscribe({
  //   next:x=>{this.filename=x
  //   this.fileUrlImg = `http://localhost:5293/api/FileMessage/${this.filename}`
  //   //console.log(this.filename)
  //   }
  
  // })

  // this.sharedS.videoName$.subscribe({
  //   next:x=>{this.filename=x
  //   this.fileUrlVx = `http://localhost:5293/api/FileMessage/${this.filename}`
    
  //   }
  
  // })


  if(!this.videoToShow && !this.imageToShow){
          this.showImage = false
  }
  else if(!this.fileUrlImg && !this.fileUrlVx){ 
this.showImage=true
  }

  //subscribing to loader
  

  
  setTimeout(() => {
    this.signalR1Service.sendMessage1(this.emailS.userInformation.email);
  }, 1000);
  
   
    }
   
    cont:string=''
    sendMessage() {

     console.log(this.emailS.userInformation) 
      const newMessage:Message={
        senderEmail:this.emailS.userInformation.email,
        receiverEmail:this.activeUser.email,
        subject:this.message,
        status:'0',
        time:new Date()
      }


      if(this.activeUser.email == newMessage.senderEmail){
        const mess:ShowMessage = {
          id:1,
           senderEmail:newMessage.senderEmail,
           receiverEmail:newMessage.receiverEmail,
            subject :newMessage.subject ,
          status:newMessage.status,
         fileDisplay:false,
         
           time:newMessage.time,
           
          user:false,
          index:-1

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
        fileDisplay:false,
        
        id:1,
       user:true,
       index:-1,

     }
         this.disMess.push(mess)

    }
    this.emailS.sendMess.next(this.disMess)

    //sending message to database
      this.emailS.postMessag(newMessage).subscribe({
        next: (x:any)=>{
          this.newM=x;
          this.signalR1Service.sendMessage(this.newM);
           
        console.log('message sent to the database successful')
        console.log(this.newM)
    },
  error: x=>{
    console.log(x)
  }})
     // this.signalR1Service.sendMessage(this.emailS.userInformation.email,this.activeUser.email, this.message);
      
      
      // this.getMessage(this.emailS.userInformation.email)
    //  this.signalR1Service.sendMessage(this.emailS.userInformation.email, this.message);
    this.cont= this.message
      
       

      this.message = '';
    }
  
    
  //   private getMessages(email:string, active:string){
  //     this.emailS.getMessage(email,active).subscribe({
  //       next: (data:any)=>{
  //            this.emailS.backendMessages =data;
  //            for(let mes of this.emailS.backendMessages){
  //             if(this.activeUser.email == mes.senderEmail){
  //                 const mess:ShowMessage = {
  //                    senderEmail:mes.senderEmail,
  //                    receiverEmail:mes.receiverEmail,
  //                     subject :mes.subject ,
  //                   status:mes.status,
  //                    time:mes.time,
  //                   user:false
      
  //                 }
  //                 console.log(mess)
  //                 this.emailS.disMess.push(mess)
  //             }
  //             else {
  //               const mess:ShowMessage = {
  //                 senderEmail:mes.senderEmail,
  //                 receiverEmail:mes.receiverEmail,
  //                  subject :mes.subject ,
  //                status:mes.status,
  //                 time:mes.time,
  //                user:true
      
  //              }
  //              this.emailS.disMess.push(mess)
  //             }
  //            }
  //            this.emailS.sendMess.next(this.emailS.disMess);
  // //console.log(data)
  //       }
  //     })
  //   }
  
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

this.topChats2=[]
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


//sending file 
// shareFileUrl = new Subject< string| ArrayBuffer | null>()
// shareFileUrl$ = this.shareFileUrl.asObservable()
imageToShow: string | ArrayBuffer | null = null;
  videoToShow: string | ArrayBuffer | null = null;


selectedFile: File | null = null;

  
  selectedImage: string | ArrayBuffer | null = null;
  selectedVideo: string | ArrayBuffer | null = null;
  isImageSelected: boolean = false;
  isVideoSelected: boolean = false;
  //selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    //this.selectedFile = event.target.files[0];
    //console.log(file);
    if (file) {
      const fileType: string = file.type;
      
      //const fileType: string = file.type;
          if(fileType.startsWith('image/')){
           // console.log('File is an image');
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.selectedImage = e.target.result;
              this.isImageSelected = true;
              this.isVideoSelected = false;
             // this.sharedS.shareImage.next(this.selectedImage)
              this.sharedS.shareF.next(file)
              this.sharedS.shareImage.next(this.selectedImage)
            //  this.sharedS.isImage.next(true);
              this.sharedS.emitActiveUser(this.activeUser)
             // this.modal.open(SendFileComponent).componentInstance.setImage(this.selectedImage);
            };
            reader.readAsDataURL(file);
          }
            else if (fileType.startsWith('video/')) {
            console.log('File is a video');
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.selectedVideo = e.target.result;
              this.isVideoSelected = true;
              this.isImageSelected = false;
              this.sharedS.shareVideo.next(this.selectedVideo)
              this.sharedS.shareF.next(file)
            };
            reader.readAsDataURL(file);
          } 

       // console.log('File is an image');
        const reader = new FileReader();
        reader.onload = (e: any) => {
         
         // this.sharedS.shareImage.next(this.selectedImage)
          this.sharedS.shareF.next(file)
          //this.sharedS.isImage.next(true);
          this.sharedS.emitActiveUser(this.activeUser)
         // this.modal.open(SendFileComponent).componentInstance.setImage(this.selectedImage);
        };
        reader.readAsDataURL(file);
      }
      //  else if (fileType.startsWith('video/')) {
      //   console.log('File is a video');
      //   const reader = new FileReader();
      //   reader.onload = (e: any) => {
      //     this.selectedVideo = e.target.result;
      //     this.isVideoSelected = true;
      //     this.isImageSelected = false;
      //     //this.sharedS.shareVideo.next(this.selectedVideo)
      //     this.sharedS.shareF.next(file)
      //   };
      //   reader.readAsDataURL(file);
      // } else {
      //   console.log('File type not supported');
      // }
    
    this.modal.open(SendFileComponent)

  }
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   //this.selectedFile = event.target.files[0];
  //   //console.log(file);
  //   if (file) {
      
  //     const fileType: string = file.type;
  //     if(fileType.startsWith('image/')){
  //      // console.log('File is an image');
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.selectedImage = e.target.result;
  //         this.isImageSelected = true;
  //         this.isVideoSelected = false;
  //        // this.sharedS.shareImage.next(this.selectedImage)
  //         this.sharedS.shareF.next(file)
  //         this.sharedS.isImage.next(true);
  //         this.sharedS.emitActiveUser(this.activeUser)
  //        // this.modal.open(SendFileComponent).componentInstance.setImage(this.selectedImage);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //       else if (fileType.startsWith('video/')) {
  //       console.log('File is a video');
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.selectedVideo = e.target.result;
  //         this.isVideoSelected = true;
  //         this.isImageSelected = false;
  //         this.sharedS.shareVideo.next(this.selectedVideo)
  //         this.sharedS.shareF.next(file)
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       console.log('File type not supported');
  //     }
  //     }
  //     //  else if (fileType.startsWith('video/')) {
  //     //   console.log('File is a video');
  //     //   const reader = new FileReader();
  //     //   reader.onload = (e: any) => {
  //     //     this.selectedVideo = e.target.result;
  //     //     this.isVideoSelected = true;
  //     //     this.isImageSelected = false;
  //     //     //this.sharedS.shareVideo.next(this.selectedVideo)
  //     //     this.sharedS.shareF.next(file)
  //     //   };
  //     //   reader.readAsDataURL(file);
  //     // } else {
  //     //   console.log('File type not supported');
  //     // }
    
  //   this.modal.open(SendFileComponent)

  // }


  //showing or showing images
  fileUrl:string =''
  vx:boolean=false
  img:boolean=false
  doc:boolean=false
  loader:boolean=false
  arrow:boolean=true
     mes!:Message
     displayMes!:ShowMessage

  showLoadAndDisplay(id:number){
    console.log(this.disMess[id])
   this.displayMes=this.disMess[id]
    
    /** spinner starts on init */
    if(this.displayMes.ext == "image" || this.displayMes.ext=="video"){
    this.disMess[id].download=true
    this.disMess[id].active=true
    
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.disMess[id].complete=true;
      this.disMess[id].active=false
      this.disMess[id].i=true
     
    }, 5000);


  }
  else {

    this.displayMes.d=true
  }

  

   
    
   
    
    // this.emailS.get1Message(id).subscribe({
    //   next:(data:any)=>{
    //         this.mes=data
    //         console.log(this.mes.ext)
    //         if(id == this.mes.id && this.mes.ext=="image") {
    //                 this.img=true;
    //       this.vx=false
    //       this.doc=false
    //       this.arrow=false
         
          //console.log("suss")

         // this.fileUrl = `http://localhost:5293/api/FileMessage/${this.mes.file}`
              
            // }

            // else if (id == this.mes.id && this.mes.ext=="video"){
            //   this.img=false;
            //   this.vx=true;
            //   this.doc=false
            //   this.arrow=false
            // }
    //   }
     
    // })
    // console.log(ext)
    // console.log(900)
    //  if(ext== "image")
           
    //       this.img=true;
    //       this.vx=false
    //       this.doc=false
    //       this.arrow=false
         
    //       console.log("suss")

    //       this.fileUrl = `http://localhost:5293/api/FileMessage/${name}`
  }


  downloadFile(x:number) {
    
    const fileName = this.disMess[x].file; // Change to the actual file name
    if(fileName)
    this.fileService.downloadFile(fileName).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
}

}
