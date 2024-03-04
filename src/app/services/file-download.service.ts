import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http:HttpClient) { }

  downloadFile(fileName:string){
    return this.http.get(`http://localhost:5293/api/FileMessage/${fileName}`, {responseType: 'blob'});
  }
}
