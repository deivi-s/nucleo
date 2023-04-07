import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { UserApplication } from '../../application/user.application';
import { RutService } from 'rut-chileno';

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
      { name: 'Visualiza', completed: false, color: 'primary' },
      { name: 'Configura', completed: false, color: 'primary' },
      { name: 'Reporte', completed: false, color: 'primary' }
    ],
  };

  moduleCheck2: Task = {
    name: 'Check',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Visualiza', completed: false, color: 'primary' },
      { name: 'Configura', completed: false, color: 'primary' },
      { name: 'Reporte', completed: false, color: 'primary' }
    ],
  };

  moduleCheck3: Task = {
    name: 'Estados',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Visualiza', completed: false, color: 'primary' },
      { name: 'Configura', completed: false, color: 'primary' },
      { name: 'Reporte', completed: false, color: 'primary' }
    ],
  };

  moduleCheck4: Task = {
    name: 'Check',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Visualiza', completed: false, color: 'primary' },
      { name: 'Configura', completed: false, color: 'primary' },
      { name: 'Reporte', completed: false, color: 'primary' }
    ],
  };

  moduleCheck5: Task = {
    name: 'Estados',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Visualiza', completed: false, color: 'primary' },
      { name: 'Configura', completed: false, color: 'primary' },
      { name: 'Reporte', completed: false, color: 'primary' }
    ],
  };

  allComplete: boolean = false;
  allCompleteCheck: boolean = false;
  allCompleteStatus: boolean = false;

  list: any = [];
  panelOpenState = false;
  companyList: any = [];
  holdingList: any = [];
  banchOfficeList: any = [];
  projectList: any = [];
  empresas: any = [];
  users: FormGroup;
  userDataAdmin: any;
  photo: string;
  submited = false;

  constructor(
    private readonly userAdmin: UserInfrastructure,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly userApplication: UserApplication,
    private routerActive: ActivatedRoute,
    private rutService: RutService
  ) { }

  ngOnInit(): void {
    this.companyListUser();
    this.holdingListUser();
    this.loadForm();
  }

  loadForm() {
    this.users = this.formBuilder.group({
      nombre: new FormControl(this.userDataAdmin?.nombre, Validators.required),
      apellidos: new FormControl(this.userDataAdmin?.apellidos, Validators.required),
      rut: new FormControl(this.userDataAdmin?.rut, [Validators.required, this.rutService.validaRutForm]),
      personal: new FormControl(),
      email: new FormControl(this.userDataAdmin?.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.userDataAdmin?.telefono),
      contacto: new FormControl(this.userDataAdmin?.contacto),
      clave: new FormControl(1),
      tipo: new FormControl(2),
      foto: new FormControl(''),
      area: new FormControl(this.userDataAdmin?.area, Validators.required),
      cargo: new FormControl(this.userDataAdmin?.cargo, Validators.required),
      cuadrilla: new FormControl(this.userDataAdmin?.cuadrilla, Validators.required),
      asignacion: new FormControl(this.userDataAdmin?.asignacion, Validators.required),
      holding: new FormControl(),
      empresa: new FormControl([], Validators.required),
      sucursal: new FormControl([], Validators.required),
      proyecto: new FormControl([], Validators.required),
    });
  }

  holdingListUser() {
    this.userAdmin.listHolding().subscribe({
      next: (data: any) => {
        this.holdingList = data;
      },
    });
  }

  companyListFilter(id: number) {
    this.userAdmin.listHoldingID(id).subscribe({
      next: (data: any) => {
        this.companyList = data;
      },
    });
  }

  companyListUser() {
    this.userAdmin.listCompany().subscribe({
      next: (data: any) => {
        this.companyList = data;
      },
    });
  }

  addList() {
    this.list.push(1);
  }

  deleteRow(row: any) {
    this.list.splice(row, 1);
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

  //////////////////////
  updateAllCompleteCheck() {
    this.allComplete = this.moduleCheck2.subtasks != null && this.moduleCheck2.subtasks.every(t => t.completed);
  }

  someCompleteCheck(): boolean {
    if (this.moduleCheck2.subtasks == null) {
      return false;
    }
    return this.moduleCheck2.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAllCheck(completed: boolean) {
    this.allCompleteCheck = completed;
    if (this.moduleCheck2.subtasks == null) {
      return;
    }
    this.moduleCheck2.subtasks.forEach(t => (t.completed = completed));
  }

  /////////////
  //////////////////////
  updateAllCompleteStatus() {
    this.allComplete = this.moduleCheck3.subtasks != null && this.moduleCheck3.subtasks.every(t => t.completed);
  }

  someCompleteStatus(): boolean {
    if (this.moduleCheck3.subtasks == null) {
      return false;
    }
    return this.moduleCheck3.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAllStatus(completed: boolean) {
    this.allCompleteStatus = completed;
    if (this.moduleCheck3.subtasks == null) {
      return;
    }
    this.moduleCheck3.subtasks.forEach(t => (t.completed = completed));
  }

  /////////////

  encriptar(password: string) {
    return CryptoJS.AES.encrypt(password, environment.password).toString();
    //this.conversionDecryptOutput = CryptoJS.AES.decrypt(password, environment.password).toString(CryptoJS.enc.Utf8);
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
          this.photo = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Cargar archivo';
    }
  }
  cancelar() {
    this.router.navigate(['/user']);
  }

  changeHolding(holding: any) {
    console.log(holding);
    this.users.controls['empresa'].patchValue([]);
    this.users.controls['sucursal'].patchValue([]);
    this.users.controls['sucursal'].patchValue([]);

    if (holding?.id) {
      this.users.value.holding = holding.id;
      this.companyListFilter(holding.id);
      return;
    }
    this.users.value.holding = 0;
    this.companyListUser();
  }

  sucursales(id_empresa: number) {
    this.userAdmin.listBranchOffice(id_empresa).subscribe({
      next: (data: any) => {
        data.map((res: any) => {
          this.validateData(res);
        })
      },
    });
  }

  validateData(data: any, empresas: any = null) {
    if (this.banchOfficeList.length === 0) {
      this.banchOfficeList.push(data);
      return;
    } else if (data) {
      let res = this.banchOfficeList.find((res: any) => res.id === data.id);
      if (!res) {

        this.banchOfficeList.push(data);

      }
      /*  !res ? this.banchOfficeList.push(data) : ''; */
    }
  }

  validateDataProject(data: any) {
    if (this.projectList.length === 0) {
      this.projectList.push(data);
      return;
    } else if (data) {
      let res = this.projectList.find((res: any) => res.id === data.id);
      !res ? this.projectList.push(data) : '';
    }
  }

  projects(id_sucursal: number) {
    this.userAdmin.listProject(id_sucursal).subscribe({
      next: (data: any) => {
        data.map((res: any) => {
          this.validateDataProject(res);
        })
      },
    });
  }

  //actual
  changeCompany(dataCompany: any) {
    this.banchOfficeList = [];
    this.projectList = [];
    this.empresas = [];
    this.users.controls['sucursal'].patchValue([]);
    this.users.controls['proyecto'].patchValue([]);
    dataCompany.map((data: any) => {
      this.sucursales(data.id);
    });
  }

  changeBranchCompany(dataBranchCompany: any) {
    this.projectList = [];
    this.users.controls['proyecto'].patchValue([]);
    dataBranchCompany.map((data: any) => {
      this.projects(data.id);
    });
  }

  guardar() {


    this.submited = true;

    try {

      let empresas = this.users.value.empresa;
      let sucursal = this.users.value.sucursal;
      let proyecto = this.users.value.proyecto;
      this.empresas = [];

      empresas.map((emp: any) => {
        let suc = sucursal.filter((sucursal: any) => sucursal.id_empresa === emp.id).map((suc: any) => {
          let proy = proyecto.filter((proyecto: any) => proyecto.id_sucursal === suc.id).map((pro: any) => { return { id_usuario_empresa_sucursal: pro.id_sucursal, id_proyecto: pro.id } });
          return {
            id_empresa: suc.id_empresa, id_sucursal: suc.id, proyecto: proy
          }
        });
        this.empresas.push({
          id_holding: this.users.value.holding ? this.users.value.holding.id : 0,
          id_empresa: emp.id,
          sucursal: suc
        })
      });


      if (!this.users.valid) {
        swal.fire({
          icon: "warning",
          title: "Ingrese los campos obligatorios",
          text: "Intenta nuevamente",
          allowOutsideClick: false,
          focusConfirm: false,
          confirmButtonText: "Continuar"
        });
        return;
      }

      this.users.value.clave ? this.users.value.clave = this.encriptar(this.users.value.rut) : this.users.value.clave = this.encriptar(environment.password);
      this.users.value.foto = this.photo;

      if (this.userDataAdmin) {
        /* const id = Number(this.routerActive.snapshot.paramMap.get('id'));
        this.userApplication.update(id, this.users.value).subscribe({
          next: () => {
            swal.fire({
              icon: "success",
              title: "Registro Editado",
              text: "El usuario a sido modificado",
              allowOutsideClick: false,
              focusConfirm: false,
              confirmButtonText: "Continuar"
            });
            this.router.navigate(['/user']);
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
        }); */
      } else {
       /*  this.userApplication.insert(this.users.value).subscribe({
          next: () => {
            swal.fire({
              icon: "success",
              title: "Registro Exitoso",
              text: "El usuario a sido agregado",
              allowOutsideClick: false,
              focusConfirm: false,
              confirmButtonText: "Continuar"
            });
            this.router.navigate(['/user']);
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
        }); */
      }


    } catch (error) {

    }


    console.log('EMPRESAS', this.empresas);
    console.log('USER', this.users.value);



  }

}
