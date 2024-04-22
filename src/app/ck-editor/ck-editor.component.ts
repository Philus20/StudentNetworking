import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { Post } from '../utils/post';
//import * as Editor from '../../../ck-editor-custom/build/ckeditor'
import { Register } from '../utils/IRegister';
import { PostB } from '../utils/post';
import { PostInfo } from '../utils/post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from '../post/post.component';
@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.css'
})
export class CkEditorComponent {
 public Editor = ClassicEditor;
 //public Editor:any = Editor
 public editorData: string = '';
 postData:string= ''
  Posts:PostB[]=[]
  post!:PostB

  temp!:Register
 constructor(private sShared:SharedService, private emailS:EmailService, private modal:NgbModal){}

 index:number=0
 onButtonClick() {
   console.log('CKEditor Content:', this.editorData);
   // You can perform any further actions with this.editorData here
  //  this.sShared.emitPost(this.editorData)
   const data:Post ={
          userId:this.emailS.userInformation.id,
          content:this.editorData,
          video:false,
          image:false,
          text:true,
          
          // fileExt:this.post.fileExt,
          // fileName:this.post.fileName,
          postDate: new Date()
   }
   this.emailS.AddPost(data).subscribe({
    next: (data:any)=>{
      console.log("New post was successful")
      this.post = data
      if(this.post.userId){
        this.emailS.getPostInfo(this.post.userId).subscribe({
          next: (data: any) => {
            this.temp = data;
              
            if (this.temp) {
              const add: PostInfo = {
                id:this.post.id,
                count:this.post.count,
                userId: this.post.userId,
                firstName: this.temp.firstName,
                surname: this.temp.surname,
                email: this.temp.email,
                content: this.post.content,
                postDate: this.post.postDate,
                fileExt:this.post.fileExt,
                fileName:this.post.fileName,
                i:this.emailS.postInfoData.length,
                d:false,
                dc:false,
                video:false,
                image:false,
                text:true,
                profilePictureName: this.temp.profilePictureName,
                programme: this.temp.programme,
                likes:this.post.likes
              };

              this.emailS.postInfoData.push(add);
              
              this.emailS.postInfoData.sort((x,y)=>
              x.postDate.getTime()-y.postDate.getTime()
    )
            }
    },
error:(err)=>{
   console.log("error while posting")
}
   })

   this.editorData=''
 }


}

   })
  }

  selectedImage: string | ArrayBuffer | null = null;
  selectedVideo: string | ArrayBuffer | null = null;
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
              // this.isImageSelected = true;
              // this.isVideoSelected = false;
             // this.sharedS.shareImage.next(this.selectedImage)
              this.sShared.shareP.next(file)
              this.sShared.postImage.next(this.selectedImage)
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
              // this.isVideoSelected = true;
              // this.isImageSelected = false;
              this.sShared.postVideo.next(this.selectedVideo)
              this.sShared.shareP.next(file)
            };
            reader.readAsDataURL(file);
          } 

       // console.log('File is an image');
        const reader = new FileReader();
        reader.onload = (e: any) => {
         
         // this.sharedS.shareImage.next(this.selectedImage)
          this.sShared.shareP.next(file)
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
