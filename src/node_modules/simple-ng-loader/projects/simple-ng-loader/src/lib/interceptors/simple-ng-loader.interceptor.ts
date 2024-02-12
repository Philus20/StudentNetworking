import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SimpleNgLoaderService } from '../services/simple-ng-loader.service';

@Injectable()
export class SimpleNgLoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: SimpleNgLoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(request).pipe( finalize(() => this.loaderService.hide()) );
  }
}
