import { Component, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { EmailService } from '../services/email.service';
import { Post, PostInfo } from '../utils/post';
import { Register } from '../utils/IRegister';
import { Route, Router } from '@angular/router';
import { PostB } from '../utils/post';
import { Comm } from '../utils/comment';
import { StuCom } from '../utils/StuCom';
@Component({
  selector: 'app-user-interest',
  templateUrl: './user-interest.component.html',
  styleUrl: './user-interest.component.css'
})
export class UserInterestComponent {

  @Input () profile:string = '';
  postData:string= ''
  Posts:PostB[]=[]
    index!:number
    baseUrl:string = 'http://localhost:5293/api/Files/'
    postUrl:string='http://localhost:5293/api/postFile/'
  temp!:Register
         constructor(private sShared:SharedService, public emailS:EmailService, private router:Router){
         
          
         }
         
         
         ngOnInit(): void {
          
          this.emailS.getPosts(this.emailS.userInformation.id).subscribe({
            next: (posts: any) => {
              
              this.emailS.Posts=posts
              // console.log(this.emailS.Posts)
                this.emailS.postInfoData=[]
                //this.i = 0
                this.index=0
              for (let post of this.emailS.Posts) {
               
                if(post.userId){
                this.emailS.getPostInfo(post.userId).subscribe({
                  next: (data: any) => {
                    this.temp = data;
                     // console.log(this.temp)
                    if (this.temp) {
                      const add: PostInfo = {
                        id:post.id,
                        count:post.count,
                        userId: this.temp.id,
                        firstName: this.temp.firstName,
                        surname: this.temp.surname,
                        email: this.temp.email,
                        content: post.content,
                        postDate: post.postDate,
                        fileExt:post.fileExt,
                        fileName:post.fileName,
                        i:this.index,
                        d:false,
                        dc:false,
                        video:post.video,
                        image:post.image,
                        text:post.text,
                        profilePictureName: this.temp.profilePictureName,
                        programme: this.temp.programme,
                        likes:post.likes
                      };
      
                      this.emailS.postInfoData.push(add);
                      this.index = this.index + 1
            //           this.emailS.postInfoData.sort((x,y)=>
            //           x.postDate.getTime()-y.postDate.getTime()
            // )
            console.log(add.i)
                    }
                  },
                  error: (error) => {
                    console.log(error);
                  }
                });
              }
             // this.i=this.i +1
            
             console.log(this.index)
            }
            // this.emailS.postInfoData.sort((x,y)=>
            //           x.postDate.getTime()-y.postDate.getTime()
            // )
            
            this.emailS.mainPageLoader(1)
            },
            error: (error) => {
              console.log(error);
           
            if(error.status==0){
               this.emailS.mainPageLoader(0)

            }

            }
          });

          this.emailS.postInfoData.sort((x,y)=>
                    x.postDate.getTime()-y.postDate.getTime()
          )
        
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

      //i am dealing with the comments here 
      commentMessage:string=''
      displayCommentInput:boolean=false
      // Id?:number,
      // UserId?:number,
      // PostId?:number,
      // Content?:string,
      // CommentDate?:Date

      postD!:PostInfo
      displayCommentInputFied(i:number){
         console.log(i)
        this.postD=this.emailS.postInfoData[i]
        console.log(this.emailS.postInfoData)
        this.postD.d=true
        console.log(this.postD)
        this.postD.dc=false
      }

      dontDisplayComment(i:number){
        this.postD=this.emailS.postInfoData[i]
        this.postD.d=false
      }

      commentsArray!:Comm
      commentContent:string=''


      //comments function
      comment(postId:number,i:number){
        
        const com:Comm={

          UserId:this.emailS.userInformation.id,
           PostId:postId,
           Content:this.commentContent
        }


     this.sShared.comment(com).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.commentsArray=data

        this.postD=this.emailS.postInfoData[i]
        this.postD.d=false
        
        this.postD.count +=1;
      },
      error:(err)=>{
        console.log(err)
      }
     })

     this.commentContent=''
    
      }




      //this method retrieve the comment and students information together
public stuCom:StuCom[]=[]


dontShow(i:number){
  this.postD=this.emailS.postInfoData[i]
        this.postD.dc=false
        console.log(this.postD)

}

showComments:boolean =false

      getStudentAndComment(postId:number,i:number){
        //this.showComments=true
        // this.stuCom =[]
         this.sShared.getStudentAndComment(postId).subscribe({
          next:(x:any)=>{
             this.stuCom=x
             console.log(this.stuCom)
             

             this.postD=this.emailS.postInfoData[i]
     this.postD.dc=true

          }
         })

      }

      postReturn!:Post

      like(i:number,postId:number,userId:number){

        this.sShared.likePost(postId,this.emailS.userInformation.id).subscribe({
          next:(data:any)=>{
           this.postReturn=data
           this.postD=this.emailS.postInfoData[i]
           this.postD.likes = this.postReturn.likes
           console.log(data)
           console.log(this.postReturn)
          },
          error:(err)=>{
            console.log(err)
          }
        })
        
      }
}
