import { Component, } from '@angular/core';
import { ImageService } from '../services/image.service';
import { FileRes } from '../utils/file';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { NgModel } from '@angular/forms';
import { Register } from '../utils/IRegister';




@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})


export class ImageUploadComponent {
  
  selectedFile: File | null = null;

  constructor(private imageService: ImageService, private sService: SharedService,private emailService:EmailService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  onUpload(): void {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.emailService.userInformation.id, this.selectedFile).subscribe({
        next: (response:Register) => {
          response
          //if(this.imageService.fileRespond){
          console.log('Image uploaded successfully ', response);
          console.log(this.selectedFile)
          console.log(response.profilePictureName)
          this.sService.emitSharedName(response.profilePictureName)
          localStorage.setItem('fileRes',response.profilePictureName)

      },
        error:(error) => {
          console.error('Error uploading image', error);
        }
    });//
    }
  }
}