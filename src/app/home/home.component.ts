import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ImageService } from '../services/image.service';
import { SharedService } from '../services/shared.service';
import { Register } from '../utils/IRegister';
import { SignalrService } from '../services/signalr.service';
import { Friendship } from '../utils/Friendship';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  profileUrl !: string;
  image!:any;
  //student!:Register ;
  suggestions :Register[]=[]
  students:Register []= []
  friendProfile!:string
  baseUrl:string = 'http://localhost:5293/api/Files/'
  pendingData :Register[] = []
  loginEmail:string = ''
  loginPass:string = ''

constructor(public emailService:EmailService, public imageService: ImageService, private sService: SharedService,private signalServe:SignalrService,
  private modal:NgbModal
  ){
  const storeEmail = localStorage.getItem('e');
  const storePass = localStorage.getItem('p');
  if (storeEmail !== null && storePass !== null) {
    this.loginEmail = storeEmail;
    this.loginPass = storePass;
  console.log(this.loginEmail + this.loginPass + ' main ');
 // this.emailService.checking(this.dbPass, this.loginPass);
  // console.log('vaue:' + this.emailService.checkingRes);

 // this.data(this.loginPass,this.dbPass)
  }
  this.emailService.getFriends(this.emailService.userInformation.id).subscribe({
    next: (friends: Register[]) => {
      // Handle the updated friends list here
      this.suggestions=friends;
      console.log('Updated Friends List:', friends);
    },
    error: (error) => {
      // Handle errors if any
      console.error('Error fetching friends:', error);
    }
  });
  

       this.signalServe.getData().subscribe({
        next: (data:any)=>{
              this.students = data
              console.log(this.students)
        },
        error: (error)=>{
          console.log("error occured")
        }
      }
        )

        

       
  // this.profileUrl=`${this.emailService.fileApiUrl}/${}`
}
open(content:string){
  this.modal.open(content)
}
ngOnInit(){
  console.log('test')
  console.log('here  ')
  

  //console.log(this.profileUrl, this.emailService.fileApiUrl);
  this.image = localStorage.getItem('fileRes')
  this.image == 'null'? 
  this.profileUrl="../../assets/uaer.png":
  this.profileUrl=`${this.emailService.fileApiUrl}/${this.image}`
  // this.friendProfile = `${this.emailService.fileApiUrl}/${this.student.profilePictureName}`
  this.sService.shareName$.subscribe((val)=>{
    
    this.profileUrl=`${this.emailService.fileApiUrl}/${val}`
  }
  )

  this.pendingDataUpdates()
}

showDotsInfo = false;

toggleDotsInfo() {
  this.showDotsInfo = !this.showDotsInfo;
}
isActive:boolean=true
//suggetion navigation
sug:boolean = true
circleSug(){
  this.sug = false
}
circlePen(){
  this.sug=true
}
requestBody!: Friendship;

sendingFriendReq(studentId: number) {
  // Set up the friend rngequest payload
  this.requestBody = {
    senderUserId: this.emailService.userInformation.id,
    receiverUserId: studentId,
    status: 0  // Assuming 0 represents a pending friend request status
  };

  // Send the friend request
  this.signalServe.sendFriend(this.requestBody).subscribe({
    next: () => {
      // Friend request sent successfully, now update the friends list
      this.updateFriendsList();
    },
    error: (error) => {
      // Handle errors if any
      console.error('Error sending friend request:', error);
    }
  });
}

updateFriendsList() {
  // Call getFriends to update the friends list
  this.emailService.getFriends(this.emailService.userInformation.id).subscribe({
    next: (friends: Register[]) => {
      // Handle the updated friends list here
      this.suggestions = friends;
      console.log('Updated Friends List:', friends);
    },
    error: (error) => {
      // Handle errors if any
      console.error('Error fetching friends:', error);
    }
  });


  

  //this.friendRequestStatus[id] = true;;
}

acceptFriend(id: number) {
  this.signalServe.acceptFriend(id, this.emailService.userInformation.id).subscribe({
    next: (res) => {
      this.updateTopChats();
      console.log(res)
    },
    error: (error) => {
      console.error('Error accepting friend:', error.message);
    }
  });
}

updateTopChats() {
  this.emailService.getTopChats(this.emailService.userInformation.id).subscribe({
    next: (friends: Register[]) => {
      // Handle the updated friends list here
      //this.pendingData= friends;
      console.log('Updated Friends List:', friends);
      this.pendingDataUpdates()
    },
    error: (error) => {
      // Handle errors if any
      console.error('Error fetching friends:', error);
    }
  });
}


pendingDataUpdates(){
  this.emailService.getPendingFrinds(this.emailService.userInformation.id).subscribe({
    next:(data:any)=>{
    this.pendingData = data;
    console.log(this.pendingData)
    //this.emailService.getEmail(this.emailService.userInformation.id);
    
  
  }
 
  })
}


}