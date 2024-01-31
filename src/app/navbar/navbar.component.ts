import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router,  public modal2:NgbModal, public modal:NgbActiveModal){}

   open(){
   this.modal2.open(EditProfileComponent)
   }
  logout(){
    console.log('fjjj')
    localStorage.removeItem('loginData')
    
    this.router.navigate(['/log']);
   }
   accountSettings(){
    
    this.router.navigate(['/account']);
   }
}
