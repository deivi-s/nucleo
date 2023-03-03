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

  moduleCheck: Task = {
    name: 'Módulo Check',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Check creados', completed: false, color: 'primary'},
      {name: 'Configuración', completed: false, color: 'primary'},
      {name: 'Plantillas', completed: false, color: 'primary'},
      {name: 'Dashboard', completed: false, color: 'primary'},
      {name: 'Reportes', completed: false, color: 'primary'},
    ],
  };

  moduleState: Task = {
    name: 'Módulo Estados',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Resumen', completed: false, color: 'primary'},
      {name: 'Procesos', completed: false, color: 'primary'},
      {name: 'Carta Gantt', completed: false, color: 'primary'},
      {name: 'Reportes', completed: false, color: 'primary'},
      {name: 'Información Base', completed: false, color: 'primary'},
    ],
  };

  allComplete: boolean = false;
  allCompleteState: boolean = false;
  panelOpenState = false;

  list : any = [0,1];

  constructor() { }

  updateAllComplete() {
    this.allComplete = this.moduleCheck.subtasks != null && this.moduleCheck.subtasks.every(t => t.completed);
  }

  updateAllCompleteState() {
    this.allCompleteState = this.moduleState.subtasks != null && this.moduleState.subtasks.every(t => t.completed);
  }



  someComplete(): boolean {
    if (this.moduleCheck.subtasks == null) {
      return false;
    }
    return this.moduleCheck.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  someCompleteState(): boolean {
    if (this.moduleState.subtasks == null) {
      return false;
    }
    return this.moduleState.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteState;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.moduleCheck.subtasks == null) {
      return;
    }
    this.moduleCheck.subtasks.forEach(t => (t.completed = completed));
  }

  setAllState(completed: boolean) {
    this.allCompleteState = completed;
    if (this.moduleState.subtasks == null) {
      return;
    }
    this.moduleState.subtasks.forEach(t => (t.completed = completed));
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

  ngOnInit(): void {
  }

}
