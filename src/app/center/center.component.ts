import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
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

  ngOnInit(){}
  
}
