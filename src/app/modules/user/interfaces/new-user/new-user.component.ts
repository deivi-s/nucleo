import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'nucleo-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  @ViewChild('fileInput') fileInput !: ElementRef;
  fileAttr = 'Nombre archivo seleccionado';

  moduleCheck: Task = {
    name: 'Usuarios',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Edita', completed: false, color: 'primary'},
      {name: 'Configura', completed: false, color: 'primary'},
      {name: 'Reporte', completed: false, color: 'primary'}
    ],
  };

  allComplete: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  
  updateAllComplete() {
    this.allComplete = this.moduleCheck.subtasks != null && this.moduleCheck.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.moduleCheck.subtasks == null) {
      return false;
    }
    return this.moduleCheck.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.moduleCheck.subtasks == null) {
      return;
    }
    this.moduleCheck.subtasks.forEach(t => (t.completed = completed));
  }


  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Cargar archivo';
    }
  }

}
