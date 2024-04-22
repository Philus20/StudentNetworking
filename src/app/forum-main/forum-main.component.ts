import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';
import { SharedService } from '../services/shared.service';
import { Question } from '../utils/StuCom';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrl: './forum-main.component.css'
})
export class ForumMainComponent {
  baseUrl:string = 'http://localhost:5293/api/Files/'
    question!:Question
    questions:Question[]=[]
  
  constructor(public emailS:EmailService,private sShare:SharedService){

  }
    ngOnInit(){

    this.sShare.getQuestions().subscribe({
      next:(x:any)=>{
      //this.question=x
      this.questions=x
      },
      error:(x)=>{
         console.log(x)
      }
    })
  }
}
