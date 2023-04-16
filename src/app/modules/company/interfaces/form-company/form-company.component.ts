import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { RutService } from 'rut-chileno';
import { UserApplication } from 'src/app/modules/user/application/user.application';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';
import swal from 'sweetalert2';


export interface Task {
  name?: string;
  completed?: boolean;
  color?: ThemePalette;
  subtasks?: any[];
}

@Component({
  selector: 'nucleo-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.scss']
})
export class FormCompanyComponent implements OnInit {
  @ViewChild('fileInput') fileInput !: ElementRef;
  fileAttr = 'Cargar archivo';

  moduleCheck: Task[] = [];

  moduleState: Task[] = [];

  allComplete: any = [];
  allCompleteState: any = [];
  panelOpenState = false;

  list: any[] = [];
  listBranch: any = [];
  listProyect: any = [];

  branches: any;

  company: FormGroup;
  dataCompany: any;
  photo: any[];
  constructor(private formBuilder: FormBuilder, private rutService: RutService, private router: Router, private readonly userApplication: UserInfrastructure) {

    this.loadFormData();

  }

  ngOnInit(): void { }

  guardar() {

    let company = this.company.value;

    company.empresas.map((emp: any, index: number) => {
      company.empresas[index].sucursales = this.listBranch[index];
      company.empresas[index].modulocheck = this.moduleCheck[index].subtasks;
      company.empresas[index].moduloestado = this.moduleState[index].subtasks;
    })

    this.userApplication.insertEmpresa(company).subscribe({
      next: () => {
        swal.fire({
          icon: "success",
          title: "Registro Exitoso",
          text: "La Empresa a sido agregado",
          allowOutsideClick: false,
          focusConfirm: false,
          confirmButtonText: "Continuar"
        });
        this.router.navigate(['/company']);
      },
      error(err) {
        swal.fire({
          icon: "warning",
          title: "Ocurrio un Error",
          text: "Intenta nuevamente",
          allowOutsideClick: false,
          focusConfirm: false,
          confirmButtonText: "Continuar"
        });
      },
    });

  }


  addCompany() {
    this.list.push(1);
    this.empresas.push(this.createCompany());
    this.listBranch.push([]);

    this.allComplete.push([false]);
    this.allCompleteState.push([false]);

    this.moduleCheck.push({
      name: 'Módulo Check',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Check creados', completed: false, color: 'primary' },
        { name: 'Configuración', completed: false, color: 'primary' },
        { name: 'Plantillas', completed: false, color: 'primary' },
        { name: 'Dashboard', completed: false, color: 'primary' },
        { name: 'Reportes', completed: false, color: 'primary' },
      ],
    });

    this.moduleState.push({
      name: 'Módulo Estados',
      completed: false,
      color: 'primary',
      subtasks: [
        { name: 'Resumen', completed: false, color: 'primary' },
        { name: 'Procesos', completed: false, color: 'primary' },
        { name: 'Carta Gantt', completed: false, color: 'primary' },
        { name: 'Reportes', completed: false, color: 'primary' },
        { name: 'Información Base', completed: false, color: 'primary' },
      ],
    });
  }

  loadFormData() {
    this.loadForm();
  }

  loadForm() {
    this.company = this.formBuilder.group({
      nombre: new FormControl(this.dataCompany?.user.nombre),
      rut: new FormControl(this.dataCompany?.user.rut, [this.rutService.validaRutForm]),
      direccion: new FormControl(this.dataCompany?.user.direccion),
      empresas: this.formBuilder.array([], Validators.required)
    });

  }

  createCompany(): FormGroup {
    return this.formBuilder.group({
      nombre: new FormControl(null),
      rut: new FormControl(null),
      direccion: new FormControl(null),
      color_a: new FormControl(null),
      color_b: new FormControl(null),
      color_c: new FormControl(null),
      estado: new FormControl(1),
      plan_comun_usuario_min: new FormControl(),
      plan_comun_usuario_max: new FormControl(),
      plan_comun_proyecto_min: new FormControl(),
      plan_comun_proyecto_max: new FormControl(),
      plan_comun_almacenamiento_min: new FormControl(),
      plan_comun_almacenamiento_max: new FormControl(),
      plan_personalizado_usuario_min: new FormControl(),
      plan_personalizado_usuario_max: new FormControl(),
      plan_personalizado_proyecto_min: new FormControl(),
      plan_personalizado_proyecto_max: new FormControl(),
      plan_personalizado_almacenamiento_min: new FormControl(),
      plan_personalizado_almacenamiento_max: new FormControl(),
      plan_medida_usuario_min: new FormControl(),
      plan_medida_usuario_max: new FormControl(),
      plan_medida_proyecto_min: new FormControl(),
      plan_medida_proyecto_max: new FormControl(),
      plan_medida_almacenamiento_min: new FormControl(),
      plan_medida_almacenamiento_max: new FormControl()
    })
  }

  get empresas(): FormArray {
    return <FormArray>this.company.get('empresas');
  }

  addProyect(row: any, rowBranch: any, rowProyect: any) {
    this.listBranch[row][rowBranch].proyectos.push({ 'nombre': null, 'direccion': null });
    console.log(this.listBranch);
  }

  addSucursal(index: number) {
    this.listBranch[index].push({ 'nombre': null, 'proyectos': [{ 'nombre': null, 'direccion': null }] })
  }



  deleteRowSucursal(row: any) {
    this.listBranch[row].splice(row, 1);
  }

  deleteRowProyect(row: any, rowBranch: any, rowProyect: any) {
    this.listBranch[row][rowBranch].proyectos.splice(rowProyect, 1);
  }

  deleteCompany(row: any) {
    const control = <FormArray>this.company.controls['empresas'];
    control.removeAt(row);
    this.list.splice(row, 1);
    this.listBranch.splice(row, 1);


  }

  cancelar() {
    this.router.navigate(['/company']);
  }

  updateAllComplete(index: number) {
    this.allComplete[index] = this.moduleCheck[index].subtasks != null && this.moduleCheck[index].subtasks?.every(t => t.completed);
  }

  updateAllCompleteState(index: number) {
    this.allCompleteState[index] = this.moduleState[index].subtasks != null && this.moduleState[index].subtasks?.every(t => t.completed);
  }



  someComplete(index: number = 0): boolean {
    if (this.moduleCheck[index].subtasks == null) {
      return false;
    }
    return (this.moduleCheck[index].subtasks?.filter(t => t.completed)?.length || 0) > 0 && !this.allComplete[index];
  }

  someCompleteState(index: number = 0): boolean {
    if (this.moduleState[index].subtasks == null) {
      return false;
    }
    return (this.moduleState[index].subtasks?.filter(t => t.completed).length || 0) > 0 && !this.allCompleteState[index];
  }

  setAll(completed: boolean, index: number) {
    this.allComplete[index] = completed;
    if (this.moduleCheck[index].subtasks == null) {
      return;
    }
    this.moduleCheck[index].subtasks?.forEach(t => (t.completed = completed));
  }

  setAllState(completed: boolean, index: number) {
    this.allCompleteState[index] = completed;
    if (this.moduleState[index].subtasks == null) {
      return;
    }
    this.moduleState[index].subtasks?.forEach(t => (t.completed = completed));
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
          /*   this.photo = imgBase64Path; */
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Cargar archivo';
    }
  }

}
