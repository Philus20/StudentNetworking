import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum-nav',
  templateUrl: './forum-nav.component.html',
  styleUrl: './forum-nav.component.css'
})
export class ForumNavComponent {
constructor(private router:Router){}

askQuestion(){
  this.router.navigate(['/askQuetion']);
}
}
