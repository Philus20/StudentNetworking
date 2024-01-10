import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FileRes } from '../utils/file';
import { Register } from '../utils/IRegister';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  //Share profile Image Name
  private shareName = new Subject<string>();
   
  shareName$= this.shareName.asObservable();
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
}
