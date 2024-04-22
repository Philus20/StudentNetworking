import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/email.service';
import { AuthService } from '../services/auth.service';
import { Login } from '../utils/Ilogin';
import { Register } from '../utils/IRegister';
import { ChatService } from '../services/chat.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  loginPass:string = '';
  dbPass:string = '';
  LoginData !: Login  // Initialize LoginData with default values
  backEndData !: Register
  showPage!:boolean;
  searchOrMain:boolean=true
  filteredRegisters:Register[]=[]
  constructor(private toastr:ToastrService ,private emailService:EmailService,private router:Router, private chatS:ChatService,private sShare:SharedService){
console.log("dk")
this.chatS.myEmail =   this.emailService.userInformation.email
//localStorage.removeItem('loginData')
  }
  

  ngOnInit(){
   this.sShare.emitSearchTrueOrFalse$.subscribe({
    next:(x)=>{
      this.searchOrMain=x
    }
   })

  

    this.sShare.shareSearch$.subscribe({
     next: (x:any)=>{
       this.filteredRegisters = x
       console.log(this.filteredRegisters)
     }
    })
  }

}

  
    
    
