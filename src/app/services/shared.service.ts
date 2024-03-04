import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject ,Observable} from 'rxjs';
import { FileRes } from '../utils/file';
import { Register } from '../utils/IRegister';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse,HttpResponse } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { catchError,throwError } from 'rxjs';
import { Comm } from '../utils/comment';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  //Share profile Image Name
  private shareName = new Subject<string>();
  private shareActiveUser = new Subject<Register>()
  sharedActiveUser$ = this.shareActiveUser.asObservable()
   private postSubject = new Subject<string>;
   postSubject$ = this.postSubject.asObservable();
  shareName$= this.shareName.asObservable();
  fileName:string=''

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
  apiUrl:string =''

  shareF = new Subject<File | null>
  shareF$ = this.shareF.asObservable()
  shareVideo= new Subject< string| ArrayBuffer | null>()
sharevideo$ = this.shareVideo.asObservable()
shareImage= new Subject< string| ArrayBuffer | null>()
shareImage$ = this.shareImage.asObservable()
isImage = new Subject<boolean>()
isImage$ = this.isImage.asObservable()

shareFile = new Subject< string| ArrayBuffer | null>()
shareFile$ = this.shareFile.asObservable()


postImageToDatabase(file:File, sender: string, receiver: string, content: string, status:string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  return this.http.post<any>(`http://localhost:5293/api/FileMessage/${sender}/${receiver}/${content}/${status}`, formData)
 .pipe(
   catchError((error: HttpErrorResponse) => {
     // Handle error appropriately
     console.error('Error uploading image:', error);
     return throwError(error);
   })
 );
}

  // Make the HTTP POST request



postVideoToDatabase(file:File, sender: string, receiver: string, content: string,status:string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file);
  return this.http.post<any>(`http://localhost:5293/api/FileMessage/${sender}/${receiver}/${content}/${status}`, formData)
 .pipe(
   catchError((error: HttpErrorResponse) => {
     // Handle error appropriately
     console.error('Error uploading video:', error);
     return throwError(error);
   })
 );
}


// emitVideoName = new Subject<string>()
// videoName$ = this.emitVideoName.asObservable()

// emitImageName = new Subject<string>()
// imageName$= this.emitImageName.asObservable()
//

//getting the files in messages
getFile(fileName: string): Observable<any> {
  return this.http.get(`http://localhost:5293/api/FileMessage/${fileName}`, { responseType: 'blob' });
}

//posting the posts which is file into the database

postVideo= new Subject< string| ArrayBuffer | null>()
postvideo$ = this.postVideo.asObservable()
postImage= new Subject< string| ArrayBuffer | null>()
postImage$ = this.postImage.asObservable()
shareP= new Subject<  File |null>()
shareP$= this.shareP.asObservable()
postFile(file:File, id:number, content:string){
  const formData: FormData = new FormData();
  formData.append('file', file);
  return this.http.post(`http://localhost:5293/api/PostInfo/${id}/${content}`, formData)
}

//Trying comment implementation. this one post a comment
comment(data:Comm){
return this.http.post('http://localhost:5293/api/Comments',data)

}
getCommentsById(i:number){
  return this.http.get(`http://localhost:5293/api/Comments/${i}`)
}

getStudentAndComment(postId:number){
  return this.http.get(`http://localhost:5293/api/StuComment/${postId}`)

}

getQuestions(){
  return this.http.get('http://localhost:5293/api/Question')
}
}
