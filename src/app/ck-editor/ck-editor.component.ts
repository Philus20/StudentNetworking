import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import * as Editor from '../../../ck-editor-custom/build/ckeditor'
import Editor from '../../../ck-editor-custom/build/ckeditor';
@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.css'
})
export class CkEditorComponent {
 public Editor = ClassicEditor;
 //public Editor:any = Editor
}
