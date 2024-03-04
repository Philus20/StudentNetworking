import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { SignalrService } from '../services/signalr.service';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Output,EventEmitter } from '@angular/core';
import { Register } from '../utils/IRegister';
import { EmailService } from '../services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
data!:Register
signin:boolean=false
x:number=4;


constructor(private service:SignalrService, private toast: ToastrService, private EmailS:EmailService,private router:Router ){
  
}
ngOnInit(){
  
    this.x=Number(localStorage.getItem('x'))
    
     
    
  }
  

  add(){this.x++
    localStorage.setItem('x', `${this.x}`)
  }
  sub(){this.x--
    localStorage.setItem('x', `${this.x}`)
    
  }
  

  onSubmit(f:NgForm){
    // this.emailS.getEmail('theophilus12.quaicoe@stu.ucc.edu.gh').subscribe({
    //   next: (data)=>{
    //     localStorage.setItem('user',JSON.stringify(data))
    //   }, 
      
    //   error:(error:any)=>{
    //     console.log(error)
    //   }
    
   //console.log(this.EmailS.loginInfo)
  
    //console.log(f.value['password']);
    if(f.invalid && f.untouched){
      

            // Handle the error here
            
               this.toast.error('The forms are required','OOPS')
               
            
        
  
    }
    else{
       this.service.postData(f.value).subscribe({
        next: (data:any)=>{
           console.log('POST request successful:', data);
           this.toast.success('','Sign up successfully')
           this.router.navigate(['/log'])

          //  this.service.getData().subscribe({
          //   next: (data:any)=>{
          //    // console.log(data)
          //                 //  this.data2 = data
          //                 //  console.log(this.data2[0].email)
          //   }
            
          //  })
        },
        error:(error)=> {
          console.error("Reached here",error.error);
            // Handle the error here
             if(error.status==0){
               console.log(error+ 1);
               this.toast.error('','check your internet connection')
               
            }
            else if(error.error = "user already exist"){
              this.toast.info('You may have sign up already','OOPS')
              console.log(error)
            }
        },
       })
      }
    //    (
    //    (response) => {
    //     console.log('POST request successful:', response);
    //     // Handle the response here
    //   },
    //   (error) => {
    //     console.error(error.error);
    //     // Handle the error here
    //     if(error.error = "user already exist"){
    //       this.toast = true;
    //     }
    //   }
    // );
 }
 
  onChange(f:NgModel){
      f.value
  }
  

  
}
