import { Component } from '@angular/core';
import { FilesService } from '../services/files.service';
import { Register } from '../utils/IRegister';
import { EmailService } from '../services/email.service';
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css'
})
export class RightComponent {
  topChats:Register[]=[];
  baseUrl:string = 'http://localhost:5293/api/Files/'
    constructor(private emailService:EmailService){
  
      this.emailService.getTopChats(emailService.userInformation.id).subscribe({
        next:(data:any)=>{
          this.topChats=data
          console.log(this.topChats)
        }
      })
    }
    


}
