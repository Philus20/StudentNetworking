# simple-ng-loader

 This package intercept your http request and shows the loader for you on each request and is in beta version.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0.

## Installation

The developer can install this package using the below command
````
    c:\projects\your-project> npm install simple-ng-loader --save
````    



## Compatibility

Compatible verymuch with angular 9.0.0 version

## Dependancy
    HttpClientModule


## How to use
 In AppModule
 ```
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';

 import { AppRoutingModule } from './app-routing.module';
 import { AppComponent } from './app.component';
 import { SimpleNgLoaderModule } from 'simple-ng-loader';
 import { HttpClientModule } from '@angular/common/http';

 @NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleNgLoaderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
 })
 export class AppModule { }
 ```

In app.component.html
````
<simple-ng-loader type="dots"></simple-ng-loader>

````

## Inputs

Input|value
----|----
type|"dots","circle"
delayTime| from 0 to 500 (milli sec)

#### Author
````
jandginvestment@gmail.com

````
# stackblitz
[https://stackblitz.com/edit/simple-ng-loader](https://stackblitz.com/edit/simple-ng-loader)

######End of the file