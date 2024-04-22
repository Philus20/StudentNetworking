import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Question } from '../utils/StuCom';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrl: './ask-questions.component.css'
})
export class AskQuestionsComponent {

    questions:Question[]=[]
    baseUrl: string = 'http://localhost:5293/api/Files/'
    message:string=''
    question!:Question
  constructor(private sService:SharedService, private emailS:EmailService){

  }

  ngOnInit(){
    this.sService.getQuestions().subscribe({
      next:(x:any)=>{
this.questions=x
      }
    })
  }

  postQuestion(){

    if(this.emailS.userInformation){

      const d:Question ={
        firstName:this.emailS.userInformation.firstName,
        surname:this.emailS.userInformation.surname,
        profilePictureName:this.emailS.userInformation.profilePictureName,
        content:this.message,
        comment:0
  
    //     "id": 0,
    // "firstName": "string",
    // "surname": "string",
    // "comment": 0,
    // "content": "string",
    // "profilePictureName": "string",
    // "questionDate": "2024-03-09T11:37:04.124Z"
      }
      this.sService.postQuestion(d).subscribe({
        next:(data:any)=>{
            this.question = data
            this.questions.push(this.question)
            console.log("question sent")
        },
        error:(x)=>{
          console.log(x)
        }
      })
    }
  
    this.message=''
  }
}
