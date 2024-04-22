import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../services/shared.service';
import { Chat2Service } from '../services/chat2.service';
import { Message } from '../utils/Message';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Post, PostInfo } from '../utils/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  public Editor = ClassicEditor;
 //public Editor:any = Editor
 public editorData: string = '';
  imageToShow: string | ArrayBuffer | null = null;
  videoToShow: string | ArrayBuffer | null = null;
  result: string | ArrayBuffer | null = null;
  message!:string 
newM!:Message
  fileData: File| null = null; // Holds the image or video data
 isImage: boolean = false; // Indicates if the file is an image
 sendingStatus: string = ''; // Holds the status of the sending process
temp!:Post
  
  



  activeUser !:Register 


  constructor(public modal : NgbActiveModal, 
    private sharedS: SharedService,
    private emailS:EmailService,
    private chat2:Chat2Service
    ){


      this.sharedS.postImage$.subscribe(imageData => {
              this.imageToShow = imageData;
              this.isImage = true;
            });
        
            this.sharedS.postvideo$.subscribe(videoData => {
              this.videoToShow = videoData;
              this.isImage = false;
            });
          



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
   
    this.sharedS.shareP$.subscribe({
      next:(data)=>{
        this.fileData = data
      },
      error:(err)=>{
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
     
//getting active user

// if(this.editorData){
//   this.message = this.editorData
// }
// else{this.message="undefined"}
// console.log(this.message)
//        this.message = "me"
//        this.message=this.editorData
      this.sharedS.postFile(this.fileData,this.emailS.userInformation.id,this.message).subscribe({
        
        next:  (response:any) => {
          console.log(this.message)
          //console.log(this.editorData + "content")
            console.log('Image uploaded successfully:', response);
            //  this.newM=  response
            //  this.chat2.fileMessage.next(this.newM)
           // console.log(response)
         this.temp=response
         if(this.temp.id && this.temp.count ){

          const add: PostInfo = {
            id:this.temp.id,
            count:this.temp.count,
            userId: this.temp.id,
            firstName: this.emailS.userInformation.firstName,
            surname: this.emailS.userInformation.surname,
             email: this.emailS.userInformation.email,
            content: this.temp.content,
            postDate:this.temp.postDate,
            fileExt:this.temp.fileExt,
            fileName:this.temp.fileName,
            i:this.emailS.postInfoData.length,
            image:this.temp.image,
            video:this.temp.video,
            text:this.temp.text,
            d:false,
            dc:false,
            likes:this.temp.likes,
            
            profilePictureName: this.emailS.userInformation.profilePictureName,
             programme: this.emailS.userInformation.programme
          };

          this.emailS.postInfoData.push(add);

         }
           

            this.sendingStatus = 'Image sent successfully!';

          },
          error: (error) => {
            console.error('Error uploading image:', error);
            this.sendingStatus = 'Failed to send image.';
          }
      });
      }

      else{
        console.log("file is empty")
      }
    
    //Close the modal after sending the file
    this.modal.dismiss()
  }
}
