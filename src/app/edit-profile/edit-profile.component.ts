import { Component } from '@angular/core';
import { NgForm,NgModel } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from '../services/email.service';
import { Register } from '../utils/IRegister';
import { Edit } from '../utils/edit';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editData!:Register
constructor(public modal:NgbActiveModal, public emailS:EmailService){console.log('hello');}

  onSubmit(f:NgForm){
    console.log(f.value);
    this.editData = f.value;
    console.log(this.editData.firstName)
    const data1:Edit = {
      
     
  email:this.emailS.userInformation.email,
      programme: this.editData.programme || this.emailS.userInformation.programme,
  password: this.editData.password || this.emailS.userInformation.password,
  firstName: this.editData.firstName || this.emailS.userInformation.firstName,
  surname: this.editData.surname || this.emailS.userInformation.surname,
  profilePictureName:this.emailS.userInformation.profilePictureName,
  dateOfBirth: this.editData.dateOfBirth || this.emailS.userInformation.dateOfBirth,
  registrationDate:this.editData.registrationDate || this.emailS.userInformation.registrationDate
 
  
    }
    // Assuming that userInformation is a property in emailS service
    this.emailS.editProfile(data1, this.emailS.userInformation.id).subscribe(
      {
        next: (data:any)=>{
          console.log(data)
this.emailS.userInformation = data;
        },
        error: (err=>console.log(err))
      }
    );
  }


  onChange(f:NgModel){

  }
}
