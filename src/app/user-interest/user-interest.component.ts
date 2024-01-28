import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-user-interest',
  templateUrl: './user-interest.component.html',
  styleUrl: './user-interest.component.css'
})
export class UserInterestComponent {
  postData:string= ''
         constructor(private sShared:SharedService){
          this.sShared.postSubject$.subscribe(
            (data)=>{
              this.postData=data
            }
          )
         }

       
}
