import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'simple-dots',
  templateUrl: './simple-dots.component.html',
  styleUrls: ['./simple-dots.component.scss']
})
export class SimpleDotsComponent implements OnInit {

  constructor() {console.log('dots'); }

  ngOnInit(): void {
  }

}
