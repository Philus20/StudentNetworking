import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,throwError } from 'rxjs';
import { FileRes } from '../utils/file';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  private apiUrl = 'http://localhost:5293/api/Files'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  uploadImage(studentId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    return this.http.post<any>(`${this.apiUrl}/upload/${studentId}`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle error appropriately
          console.error('Error uploading image:', error);
          return throwError(error);
        })
      );
  }
  
}

