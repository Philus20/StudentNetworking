import { Component } from '@angular/core';
import { FilesService } from '../services/files.service';
import { Register } from '../utils/IRegister';
import { EmailService } from '../services/email.service';
import { SharedService } from '../services/shared.service';
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css'
})
export class RightComponent {
  topChats:Register[]=[];
  baseUrl:string = 'http://localhost:5293/api/Files/'
    constructor(private emailService:EmailService,private sharedS:SharedService){
  
      this.emailService.getTopChats(emailService.userInformation.id).subscribe({
        next:(data:any)=>{
          this.topChats=data
          console.log(this.topChats)

        }
      })
    }

    ngOnInit(){
      
      //this.emailService.chats$.subscribe
    }

    activeUser(id: number) {
      this.topChats.forEach(student => {
          if (student.id == id) {
              this.sharedS.emitActiveUser(student)
          }
      });
  }
  
    


}
