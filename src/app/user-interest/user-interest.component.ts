import { Component, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { PostInfo } from '../utils/post';
import { Register } from '../utils/IRegister';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-interest',
  templateUrl: './user-interest.component.html',
  styleUrl: './user-interest.component.css'
})
export class UserInterestComponent {

  @Input () profile:string = '';
  postData:string= ''
  temp!:Register
         constructor(private sShared:SharedService, public emailS:EmailService, private router:Router){
         
          
         }

         ngOnInit(): void {
          
          this.emailS.getPosts(this.emailS.userInformation.id).subscribe({
            next: (posts: any) => {
              
              this.emailS.Posts=posts
              console.log(this.emailS.Posts)
     
              for (let post of this.emailS.Posts) {
               
                if(post.userId){
                this.emailS.getPostInfo(post.userId).subscribe({
                  next: (data: any) => {
                    this.temp = data;
                      
                    if (this.temp) {
                      const add: PostInfo = {
                        userId: post.id,
                        firstName: this.temp.firstName,
                        surname: this.temp.surname,
                        email: this.temp.email,
                        content: post.content,
                        postDate: post.postDate,
                        profilePictureName: this.temp.profilePictureName,
                        programme: this.temp.programme
                      };
      
                      this.emailS.postInfoData.push(add);
                      this.emailS.Posts.sort((x,y)=>
                      x.postDate.getTime()-y.postDate.getTime()
            )
                    }
                  },
                  error: (error) => {
                    console.log(error);
                  }
                });
              }
            }
            this.emailS.mainPageLoader(1)
            },
            error: (error) => {
              console.log(error);
           
            if(error.status==0){
               this.emailS.mainPageLoader(0)

            }

            }
          });
        
      }
      
      
      goToMessage(email:string){
        if(email != this.emailS.userInformation.email){
          this.router.navigate(['/mes']);
        }
        this.emailS.getEmail(email).subscribe({
          next:(dat:any)=>{
               const student:Register = dat
                    this.sShared.emitActiveUser(student)
                  

          }
        })
                 // this.sharedS.emitActiveUser(student)
              
         
      
      
      }
       
}
