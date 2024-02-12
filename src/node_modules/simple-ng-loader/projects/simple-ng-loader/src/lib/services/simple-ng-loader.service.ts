import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleNgLoaderService {
  isLoading =  new Subject < boolean >();
  @Input () delayTime  = 0;

  constructor() { }

  assignDelayTime(delay = 0) {
    if ( delay > 0) {
    this.delayTime = delay;
   } }

  show() {
           this.isLoading.next(true); }
  hide() {
    console.log(this.delayTime);
    setTimeout(() => {
    this.isLoading.next(false);
    }, this.delayTime);
  }
}
