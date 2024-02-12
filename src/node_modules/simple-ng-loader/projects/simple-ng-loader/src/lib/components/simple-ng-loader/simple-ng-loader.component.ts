import { Component, OnInit, Input } from '@angular/core';
import { SimpleNgLoaderService } from '../../services/simple-ng-loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'simple-ng-loader',
  templateUrl: './simple-ng-loader.component.html',
  styleUrls: ['./simple-ng-loader.component.scss']
})
export class SimpleNgLoaderComponent implements OnInit {
  isLoading: Subject <boolean> = this.loaderService.isLoading;
  @Input () public delayTime = 0;
  @Input () public type = 'circle';

  constructor(private loaderService: SimpleNgLoaderService) {
   }
  ngOnInit(): void {
    this.loaderService.assignDelayTime(this.delayTime);
  }

}
