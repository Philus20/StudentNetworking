import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Question } from '../utils/StuCom';

@Component({
  selector: 'app-ask-questions',
  templateUrl: './ask-questions.component.html',
  styleUrl: './ask-questions.component.css'
})
export class AskQuestionsComponent {

    questions:Question[]=[]
    baseUrl: string = 'http://localhost:5293/api/Files/'
  constructor(private sService:SharedService){

  }

  ngOnInit(){
    this.sService.getQuestions().subscribe({
      next:(x:any)=>{
this.questions=x
      }
    })
  }
}
