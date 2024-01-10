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
@Injectable({
  providedIn: 'root'
})


export class EmailService {
  //student!: string; 
loginInfo:Register[]=[] ;
checkingRes!:Boolean
userInformation!:Register
Friends:Friendship[] =[]
private friendsSubject = new BehaviorSubject<Register[]>([]);
friends$ = this.friendsSubject.asObservable();

api = "http://localhost:5293/Students"
fileApiUrl:string ='http://localhost:5293/api/Files'

  constructor(private http:HttpClient, private loginService:LoginService) {
    // this.student = ((localStorage.getItem('user')!));
    // const parsedUser: Register = JSON.parse(this.student);
    //     this.loginInfo =[ parsedUser]
    //     localStorage.clear
   
    

   
    
    //  console.log(this.loginInfo)
    //  console.log(this.loginService.nam)

   }
   //calling suggestion controller
  //  getFriends(id: number) {
  //   return this.http.get(`http://localhost:5293/Suggestion/${id}/circle`);
  // }
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
   checking(bankendPassword:string, frontentPassword:string):boolean{
    if( bankendPassword==frontentPassword ){

      this.checkingRes=true
      console.log(this.userInformation)
return true
    }
    else{
      this.checkingRes=false
      return false
    }

   }
   //http://localhost:5293/Suggestion/1/pen
   getPendingFrinds(id:number){
    return this.http.get(`http://localhost:5293/Suggestion/${id}/pen`)
   }

   getTopChats(id:number){
return this.http.get(`http://localhost:5293/Suggestion/${id}/chat`)
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
