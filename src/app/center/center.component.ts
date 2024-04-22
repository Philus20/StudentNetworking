import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
import { SharedService } from '../services/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';


@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
topChats:Register[]=[];
baseUrl:string = 'http://localhost:5293/api/Files/'
profileUrl:string = ''
imageToShow: string | ArrayBuffer | null = null;
  videoToShow: string | ArrayBuffer | null = null;
image:any
filteredRegisters:Register[]=[]


selectedFile: File | null = null;

  
  selectedImage: string | ArrayBuffer | null = null;
  selectedVideo: string | ArrayBuffer | null = null;
  isImageSelected: boolean = false;
  isVideoSelected: boolean = false;

  constructor(private emailService:EmailService, private sSharedServe:SharedService, private modal:NgbModal){
   

    // Fetch initial top chats
    this.emailService.getTopChats(emailService.userInformation.id).subscribe({
      next: (data: Register[]) => {
        this.topChats = data;
        console.log('Initial top chats:', this.topChats);
      },
      error: (error) => {
        console.error('Error fetching initial top chats:', error);
      }
    });
//  this.image = localStorage.getItem('fileRes')
//     this.image == 'null' ?
//       this.profileUrl = "../../assets/uaer.png" :
if(this.emailService.profileUrl)
      this.profileUrl = this.emailService.profileUrl
   //this.profileUrl =this.baseUrl+this.emailService.userInformation.profilePictureName
    
  }


  ngOnInit(){
    if(this.emailService.profileUrl){
      this.profileUrl = this.emailService.profileUrl;
   //this.profileUrl =this.baseUrl+this.emailService.userInformation.profilePictureName
    }
  
    //this.emailService.chats$.subscribe
     // Subscribe to the chats$ observable
     this.emailService.chats$.subscribe({
      next: (data: Register[]) => {
        this.topChats = data;
        console.log('Updated top chats:', this.topChats);
      },
      error: (error) => {
        console.error('Error fetching top chats:', error);
      }
    });

    //dealing with the profile picture
   
    // this.friendProfile = `${this.emailService.fileApiUrl}/${this.student.profilePictureName}`
    this.sSharedServe.shareName$.subscribe((val) => {
       console.log("e78594")
      this.profileUrl =  `${this.emailService.fileApiUrl}/${val}`
      localStorage.setItem("p",val)

    }


    )

    

  }

  ckEditor:boolean=false
hideE : boolean = false;
  showEditor(){
    this.ckEditor = true
    this.hideE=true;

    this.sSharedServe.pic$.subscribe({
      next: x=>{
   this.profileUrl=x
   console.log(this.profileUrl)
       },
       error:x=>{console.log(x)}})
     }
  
  hideEditor(){
    this.ckEditor = false;
    this.hideE=false
  }

  showPostModal(){
      this.modal.open(PostComponent)
  }


  //while i am selecting image or video to post this method is being called
  onFile(event: any) {
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
              this.sSharedServe.shareP.next(file)
              this.sSharedServe.postImage.next(this.selectedImage)
            //  this.sharedS.isImage.next(true);
            //  this.sSharedServe.emitActiveUser(this.activeUser)
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
              this.sSharedServe.postVideo.next(this.selectedVideo)
              this.sSharedServe.shareP.next(file)
            };
            reader.readAsDataURL(file);
          } 

       // console.log('File is an image');
        const reader = new FileReader();
        reader.onload = (e: any) => {
         
         // this.sharedS.shareImage.next(this.selectedImage)
          this.sSharedServe.shareP.next(file)
          //this.sharedS.isImage.next(true);
          //this.sSharedServe.emitActiveUser(this.activeUser)
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
    
    this.modal.open(PostComponent)

  }


}
