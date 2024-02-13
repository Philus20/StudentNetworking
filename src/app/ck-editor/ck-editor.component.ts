import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { Post } from '../utils/post';
//import * as Editor from '../../../ck-editor-custom/build/ckeditor'

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.css'
})
export class CkEditorComponent {
 public Editor = ClassicEditor;
 //public Editor:any = Editor
 public editorData: string = '';
 constructor(private sShared:SharedService, private emailS:EmailService){}

 onButtonClick() {
   console.log('CKEditor Content:', this.editorData);
   // You can perform any further actions with this.editorData here
  //  this.sShared.emitPost(this.editorData)
   const data:Post ={
          userId:this.emailS.userInformation.id,
          content:this.editorData,
          postDate: new Date()
   }
   this.emailS.AddPost(data).subscribe({
    next: (data)=>{
      console.log("New post was successful")
    },
error:(err)=>{
   console.log("error while posting")
}
   })

   this.editorData=''
 }


}
