import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})
export class CenterComponent {
topChats:Register[]=[];
baseUrl:string = 'http://localhost:5293/api/Files/'
profileUrl:string = ''
  constructor(private emailService:EmailService, private sSharedServe:SharedService){
   

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

   this.profileUrl =this.baseUrl+this.emailService.userInformation.profilePictureName
    
  }

  ngOnInit(){
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
  

}
