import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrl: './toasts.component.css'
})
export class ToastsComponent {
constructor(private toastr:ToastrService){}

showSuccess() {
  this.toastr.success('Hello world!', 'Toastr fun!');
}
}
