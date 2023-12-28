import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
isActive:boolean = false;
isActive2:boolean = true
changeColor(){
  this.isActive=true
  this.isActive2=false
}
changeReg(){
  this.isActive=false
  this.isActive2=true
}
}
