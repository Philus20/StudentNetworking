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
  topChats2:TopChatAddCounting[]=[]
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
                   console.log(data)
                  
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
         
    
     
      index:number =0
        
 
  private getMessage(email:string, active:string){
    this.emailService.getMessage(email,active).subscribe({
      next: (data:any)=>{
           this.emailService.backendMessages =data;
           for(let mes of this.emailService.backendMessages){
            if(this.activeUser1.email == mes.senderEmail){
              if(mes.isFile=="1"){
                if(mes.file && mes.ext &&mes.id){
                  
                  if(mes.ext == "image"){
                  const mess:ShowMessage = {
                    id:mes.id,
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:true,
                  file:mes.file,
                  isFile:mes.file,
                   time:mes.time,
                   ext:mes.ext,
                  user:false,
                // i:true,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`
    
                }
                this.emailService.disMess.push(mess)
              }

              else if(mes.ext == "video"){
                const mess:ShowMessage = {
                  id:mes.id,
                 senderEmail:mes.senderEmail,
                 receiverEmail:mes.receiverEmail,
                  subject :mes.subject ,
                status:mes.status,
                fileDisplay:true,
                file:mes.file,
                isFile:mes.file,
                 time:mes.time,
                 ext:mes.ext,
                user:false,
               // v:true,
                index:this.index,
                fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

  
              }
              this.emailService.disMess.push(mess)
            }

            else {
              const mess:ShowMessage = {
                id:mes.id,
               senderEmail:mes.senderEmail,
               receiverEmail:mes.receiverEmail,
                subject :mes.subject ,
              status:mes.status,
              fileDisplay:true,
              file:mes.file,
              isFile:mes.file,
               time:mes.time,
               ext:mes.ext,
              user:false,
              download:true,
              d:true,
              fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`,
              index:this.index


            }
            this.emailService.disMess.push(mess)
          }
              }
              }

              //End of the nested if 

              //starting the else
              else{
                if(   mes.id){
                  const mess:ShowMessage = {
                    id:mes.id,
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:false,
                  
                  isFile:mes.file,
                   time:mes.time, 
                  
                  user:false,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

    
                }
                this.emailService.disMess.push(mess)
              }
              }
              //end of the nested else
            }
            else {
              if(mes.isFile=="1"){
                 if(mes.file && mes.ext   &&mes.id){
                  if(mes.ext=="image"){
                const mess:ShowMessage = {
                  id:mes.id,
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:true,
                  file:mes.file,
                  isFile:mes.file,
                   time:mes.time,
                   ext:mes.ext,
                  user:true,
                  //i:true,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

    
                }
                this.emailService.disMess.push(mess)
              }
             else if(mes.ext=="video"){
                const mess:ShowMessage = {
                  id:mes.id,
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:true,
                  file:mes.file,
                  isFile:mes.file,
                   time:mes.time,
                   ext:mes.ext,
                  user:true,
                 // v:true,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

    
                }
                this.emailService.disMess.push(mess)
              }
              else{
                const mess:ShowMessage = {
                  id:mes.id,
                   senderEmail:mes.senderEmail,
                   receiverEmail:mes.receiverEmail,
                    subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:true,
                  file:mes.file,
                  isFile:mes.file,
                   time:mes.time,
                   ext:mes.ext,
                  user:true,
                  download:true,
                  d:true,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

    
                }
                this.emailService.disMess.push(mess)
              }
              }
              }

              //End of the nested if 

              //starting the else
              else{
                if(mes.id){
                const mess:ShowMessage = {
                  id:mes.id,
                  senderEmail:mes.senderEmail,
                  receiverEmail:mes.receiverEmail,
                  subject :mes.subject ,
                  status:mes.status,
                  fileDisplay:false,
                  file:mes.file,
                  isFile:mes.file,
                   time:mes.time,
                  
                  user:true,
                  index:this.index,
                  fileUrl:`http://localhost:5293/api/FileMessage/${mes.file}`

    
                }
                this.emailService.disMess.push(mess)
              }
              }
            }
          this.index++ 
        }
           this.emailService.sendMess.next(this.emailService.disMess);
//console.log(data)
      }
    })
  }
  
    


}
