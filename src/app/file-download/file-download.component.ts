import { Component, Input } from '@angular/core';
import { FileDownloadService } from '../services/file-download.service';
@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrl: './file-download.component.css'
})
export class FileDownloadComponent {
  constructor(private fileService: FileDownloadService) { }
  @Input() fileName:string = '';
  @Input() fileExt:string=''

  downloadFile() {
    const fileName = '3f6256c0-ec48-4fc1-9457-ec687a3a127e.jpeg'; // Change to the actual file name
    this.fileService.downloadFile(fileName).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
}
