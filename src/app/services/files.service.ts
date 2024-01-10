import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
fileApiUrl:string ='http://localhost:5293/api/Files'
  constructor(private httpClient:HttpClient) { }

  getPicture(name:string){
     this.httpClient.get(`${this.fileApiUrl}/${name}`)
  }

  postImage(id:number,file:File){
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post(this.fileApiUrl, formData);
  }
}
