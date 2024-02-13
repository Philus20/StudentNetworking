import { Component,Input } from '@angular/core';
import { FilesService } from '../services/files.service';
import { Register, TopChatAddCounting } from '../utils/IRegister';
import { EmailService } from '../services/email.service';
import { SharedService } from '../services/shared.service';
import { ShowMessage } from '../utils/ShowMessage';
@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrl: './right.component.css'
})
export class RightComponent {
  topChats:Register[]=[];
  @Input () topChats2:TopChatAddCounting[]=[]
  baseUrl:string = 'http://localhost:5293/api/Files/';
  activeUser1 !:Register 
  x:number = 0
    constructor(private emailService:EmailService,private sharedS:SharedService){
  
      this.emailService.getTopChats(emailService.userInformation.id).subscribe({
        next:(data:any)=>{
          this.topChats=data
               

        }
      })
     

    }

    ngOnInit(){
      this.emailService.topChats$.subscribe(data=>{
        this.topChats2=data
      })

      this.sharedS.sharedActiveUser$.subscribe(
        data=>{
          
          this.activeUser1 = data;
        }
        )
       
        //fetching message from backend
        

       
      //this.emailService.chats$.subscribe
    }

    activeUser(id: number) {
      this.emailService.disMess = []
      
      this.topChats.forEach(student => {
          if (student.id == id) {
              this.sharedS.emitActiveUser(student)
              this.getMessage(this.emailService.userInformation.email,student.email)
              
          }
        
      
      
            this.emailService.getMessage(this.emailService.userInformation.email,student.email).subscribe({
              next: (data:any)=>{
                
                   this.emailService.backendMessages=data
                   
                  
                   for(let message of  this.emailService.backendMessages ){
                   
                    if((message.receiverEmail == this.emailService.userInformation.email && message.senderEmail==student.email)&& message.status=="0"){
                      if(message.id)  
                      this.emailService.editMessage(message.id).subscribe({
                    next: (data)=>{
                      console.log("edited")
                    },
                    error:(error)=>{
                      console.log(error.message)
                    }
                    
                      })
                  }
                 
                  }
                    
                   this.emailService.cheatToUpdateUnread();
                   
            },
            error:(r)=>{
              console.log(r)
           } })
          
       
        
          }
      )
          }
          // this.emailService.emitTopchats(this.topChats2)
         
    
     
      
        
 
  private getMessage(email:string, active:string){
    this.emailService.getMessage(email,active).subscribe({
      next: (data:any)=>{
           this.emailService.backendMessages =data;
           for(let mes of this.emailService.backendMessages){
            if(this.activeUser1.email == mes.senderEmail){
                const mess:ShowMessage = {
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                   time:mes.time,
                  user:false
    
                }
              
                this.emailService.disMess.push(mess)
            }
            else {
              const mess:ShowMessage = {
                senderEmail:mes.senderEmail,
                receiverEmail:mes.receiverEmail,
                 subject :mes.subject ,
               status:mes.status,
                time:mes.time,
               user:true
    
             }
             this.emailService.disMess.push(mess)
            }
           }
           this.emailService.sendMess.next(this.emailService.disMess);
//console.log(data)
      }
    })
  }
  
    


}
