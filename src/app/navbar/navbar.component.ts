import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router:Router){}
  me(){
    console.log('fjjj')
    localStorage.removeItem('loginData')
    
    this.router.navigate(['/log']);
   }
}
