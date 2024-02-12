import { NgModule } from '@angular/core';
import { SimpleNgLoaderComponent } from './components/simple-ng-loader/simple-ng-loader.component';

import {SimpleNgLoaderService } from './services/simple-ng-loader.service' ;
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SimpleNgLoaderInterceptor } from './interceptors/simple-ng-loader.interceptor';
import { CommonModule } from '@angular/common';
import { SimpleDotsComponent } from './components/shared/simple-dots/simple-dots.component';
import { SimpleDots2Component } from './components/shared/simple-dots2/simple-dots2.component';
import { SimpleBarComponent } from './components/shared/simple-bar/simple-bar.component';


@NgModule({
  declarations: [SimpleNgLoaderComponent, SimpleDotsComponent, SimpleDots2Component,  SimpleBarComponent],
  imports: [CommonModule
  ],
  exports: [SimpleNgLoaderComponent],
  providers: [SimpleNgLoaderService, { provide: HTTP_INTERCEPTORS,
     useClass: SimpleNgLoaderInterceptor, multi: true }  ]
})
export class SimpleNgLoaderModule { }
