import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../utils/api-response';
import { Register } from '../utils/IRegister';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../utils/Ilogin';
import { LoginService } from './login.service';
import { Friendship } from '../utils/Friendship';
import { Edit } from '../utils/edit';
import { PostB,PostInfo } from '../utils/post';
@Injectable({
  providedIn: 'root'
})


export class EmailService {
  //student!: string; 
loginInfo:Register[]=[] ;
postInfoData:PostInfo[]=[]
checkingRes!:Boolean
userInformation!:Register
Posts:PostB[]=[]
Friends!:Friendship[] ;
private friendsSubject = new BehaviorSubject<Register[]>([]);
friends$ = this.friendsSubject.asObservable();

api = "http://localhost:5293/Students"
fileApiUrl:string ='http://localhost:5293/api/Files'

  constructor(private http:HttpClient, private loginService:LoginService) {
  }
  getFriends(id: number): Observable<Register[]> {
    // Make API call to get friends
    this.http.get<Register[]>(`http://localhost:5293/Suggestion/${id}/circle`)
      .subscribe(friends => {
        // Update the friends subject
        this.friendsSubject.next(friends);
        console.log('it is working')
      });

    return this.friends$;
  }

  getEmail(email: string) {
    const url = `${this.api}/${email}`;

    return this.http.get(url)
      
  }
   checking(bankendPassword: string, frontendPassword: string): boolean {
    if (bankendPassword == frontendPassword) {
      this.checkingRes = true;
      
      return true;
    } else {
      this.checkingRes = false;
      console.log('checkingRes:', this.checkingRes);
      return false;
    }
  }
  
   //http://localhost:5293/Suggestion/1/pen
   getPendingFrinds(id:number){
    return this.http.get(`http://localhost:5293/Suggestion/${id}/pen`)
   }

   private chatSubject = new BehaviorSubject<Register[]>([]);
chats$ = this.chatSubject.asObservable();

getTopChats(id: number): Observable<Register[]> {
   this.http.get<Register[]>(`http://localhost:5293/Suggestion/${id}/chat`).subscribe(
    // Use the tap operator to perform side-effects without modifying the response
    chat => {
      // Emit the new value to subscribers
      this.chatSubject.next(chat);
      console.log('it is working, top chat')
      
    }
   );
   return this.chats$;
  
    }

    editProfile(data:any, id:number){
      return this.http.put(`http://localhost:5293/Students/${id}`,data)
    }

    AddPost(data:any){
     return this.http.post('http://localhost:5293/api/Post',data)
    }
    getPosts(id:number){
      return this.http.get(`http://localhost:5293/api/Post/${id}`);
    }
    getPostInfo(id:number){
      return this.http.get(`http://localhost:5293/api/PostInfo/${id}`);
    }

 // getUserById(pass1:string) {
  //   this.getEmail(email).subscribe({
  //     next: (data:any) => {
       
  //       this.loginInfo =[data]
  //         // Save user data to local storage
  //         localStorage.setItem('user', JSON.stringify(this.loginInfo));
           
  //         // Update the value of this.name
        
  //       //console.log(this.loginInfo)
  //       return this.loginInfo
        
  //     },
  //     error: (error) => {
  //       console.error('Error getting user:', error);
  //     }
  //   });
  // }

  
  
}
