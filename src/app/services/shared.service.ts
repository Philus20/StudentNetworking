import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FileRes } from '../utils/file';
import { Register } from '../utils/IRegister';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  //Share profile Image Name
  private shareName = new Subject<string>();
  private shareActiveUser = new Subject<Register>()
  sharedActiveUser$ = this.shareActiveUser.asObservable()
   private postSubject = new Subject<string>;
   postSubject$ = this.postSubject.asObservable();
  shareName$= this.shareName.asObservable();

  private shareMessage = new Subject<string>();
  shared$ = this.shareMessage.asObservable()
  emitSharedName(vale:string){
    console.log(vale)
    this.shareName.next(vale)
  }
  private student = new Subject<Register>();
  student$ = this.shareName.asObservable();

  emitStudent(stu:Register){
        console.log(stu)
        this.student.next(stu)
  }
  

  emitActiveUser(student:Register){
        this.shareActiveUser.next(student)
  }

  emitPost(content:string){
          this.postSubject.next(content)
  }

  emitMessage(content:string){
    this.shareMessage.next(content)
  }
  private pic = new Subject<string>();
   pic$ = this.pic.asObservable()
  emitProfilePic(url:string){
this.pic.next(url)
  }
}
