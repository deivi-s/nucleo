import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'nucleo-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {
  @ViewChild('fileInput') fileInput !: ElementRef;
  fileAttr = 'Cargar archivo';

  task: Task = {
    name: 'Módulo Check',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Configuración', completed: false, color: 'primary'},
      {name: 'Plantillas', completed: false, color: 'primary'},
      {name: 'Dashboard', completed: false, color: 'primary'},
      {name: 'Reportes', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;

  constructor() { }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }


  ngOnInit(): void {
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
