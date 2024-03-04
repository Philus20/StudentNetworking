import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { ImageService } from '../services/image.service';
import { SharedService } from '../services/shared.service';
import { Register } from '../utils/IRegister';
import { SignalrService } from '../services/signalr.service';
import { Friendship } from '../utils/Friendship';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  profileUrl !: string;
  image!: any;
  //student!:Register ;
  suggestions: Register[] = []
  students: Register[] = []
  friendProfile!: string
  baseUrl: string = 'http://localhost:5293/api/Files/'//http://localhost:5293/api/Files/1658c3d3-e623-4d5f-9d43-bde250a992a0.jpeg
  pendingData: Register[] = []
  loginEmail: string = ''
  loginPass: string = ''
  user!:Register

  constructor(public emailService: EmailService, public imageService: ImageService, private sService: SharedService, private signalServe: SignalrService) {

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


    this.signalServe.getData().subscribe({
      next: (data: any) => {
        this.students = data
        console.log(this.students)
      },
      error: (error) => {
        console.log("error occured")
      }
    }
    )

 //i am trying to get the information of a user so that i cant update the profile
 setTimeout(() => {
  this.emailService.getEmail(this.emailService.userInformation.email).subscribe({
    next:(data:any)=>{
             this.user = data;
            // this.emailService.userInformation.email = this.user.profilePictureName
    }
  
  })
 }, 2000);
 


    // this.profileUrl=`${this.emailService.fileApiUrl}/${}`
  }
  ngOnInit() {
    console.log('test')
    console.log('here  ')

   
    //console.log(this.profileUrl, this.emailService.fileApiUrl);
   this.image = localStorage.getItem('fileRes')
    this.image == 'null' ?
      this.profileUrl = "../../assets/uaer.png" :
      this.profileUrl = `${this.emailService.fileApiUrl}/${this.image}`
      this.emailService.profileUrl=this.profileUrl
    // this.friendProfile = `${this.emailService.fileApiUrl}/${this.student.profilePictureName}`
    this.sService.shareName$.subscribe((val) => {
       console.log("e78594")
      this.profileUrl =  `${this.emailService.fileApiUrl}/${val}`
      localStorage.setItem("p",val)

    }
    )


    this.pendingDataUpdates()
  }

  showDotsInfo = false;

  toggleDotsInfo() {
    this.showDotsInfo = !this.showDotsInfo;
  }
  isActive: boolean = true
  //suggetion navigation
  sug: boolean = true
  circleSug() {
    this.sug = false
  }
  circlePen() {
    this.sug = true
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


  pendingDataUpdates() {
    this.emailService.getPendingFrinds(this.emailService.userInformation.id).subscribe({
      next: (data: any) => {
        this.pendingData = data;
        console.log(this.pendingData)
        //this.emailService.getEmail(this.emailService.userInformation.id);


      }

    })
  }


}