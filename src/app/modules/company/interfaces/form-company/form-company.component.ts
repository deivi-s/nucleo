import { CompanyInfrastructure } from './../../infrastructure/company.infraestructure';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutService } from 'rut-chileno';
import swal from 'sweetalert2';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';
import { CompanyApplication } from '../../application/company.application';


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
export class FormCompanyComponent implements OnInit, AfterContentInit, AfterViewInit {
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

  listDeleteCompany: any = [];
  listDeleteSucursal: any = [];
  listDeleteProyect: any = [];
  branches: any;

  company: FormGroup;
  photo: any[];

  empresa: any = [];
  idEmpresa: number;
  constructor(
    private formBuilder: FormBuilder,
    private rutService: RutService,
    private router: Router,
    private readonly companyInfrastructure: CompanyInfrastructure,
    private routerActive: ActivatedRoute,
    private readonly userfrastructure: UserInfrastructure,
    private readonly companyApplication: CompanyApplication
  ) {

  }

  async ngOnInit() {
    this.loadFormData();
  }

  async getDataCompany(id: number): Promise<any> {
    let resumen: any;
    return new Promise((resolve, reject) => {
      this.companyInfrastructure.getEmpresa(id).subscribe((company) => {
        resumen = company.empresas;
        resumen.propietario = company.propietario;
        company.empresas.map((com: any, index: number) => {
          this.addCompany(com);
          /*    this. */
          this.userfrastructure.listBranchOffice(com.id).subscribe((sucursal: any) => {
            resumen[index].sucursales = sucursal;
            sucursal.map((suc: any, indexSucursal: number) => {
              this.listBranch[index].push({ 'id': suc.id, 'nombre': suc.nombre, 'proyectos': [] });
              this.userfrastructure.listProject(suc.id).subscribe((proyecto: any) => {
                resumen[index].sucursales[indexSucursal].proyectos = proyecto;
                proyecto.map((pro: any) => {
                  this.listBranch[index][indexSucursal].proyectos.push({ 'id': pro.id, 'nombre': pro.nombre, 'direccion': pro.direccion });
                });

              });
            });
          });
        });
        resolve(resumen);
      });
    });
  }

  ngAfterViewInit(): void {

  }

  async ngAfterContentInit() {
    this.idEmpresa = Number(this.routerActive.snapshot.paramMap.get('id'));
    if (this.idEmpresa) {
      const company = await this.getDataCompany(this.idEmpresa);
      this.empresa = company;
      this.company.controls['nombre'].setValue(this.empresa.propietario.nombre);
      this.company.controls['direccion'].setValue(this.empresa.propietario.direccion);
      this.company.controls['rut'].setValue(this.empresa.propietario.rut);
    }

  }

  guardar() {
    let company = this.company.value;

    company.empresas.map((emp: any, index: number) => {
      company.empresas[index].sucursales = this.listBranch[index];
      company.empresas[index].modulocheck = this.moduleCheck[index].subtasks;
      company.empresas[index].moduloestado = this.moduleState[index].subtasks;
    })

    if (this.idEmpresa) {


      this.listDeleteCompany.map((id_company: number) => {
        this.companyInfrastructure.disableEmpresa(id_company).subscribe(() => { });
        this.userfrastructure.listBranchOffice(id_company).subscribe((sucursal: any) => {
          sucursal.map((suc: any) => {
            this.companyInfrastructure.disableSucursal(suc.id).subscribe((fa) => { });
            // Deshabilitar todos los registros de sucursal para usuarios
            // Buscar todos los registros de sucursal en usuarios
            this.companyInfrastructure.allSucursalUsuarioByIdSucursal(suc.id).subscribe((detalle) => {
              detalle.map((data: any) => {
                //Disable Sucursales asociadas
                this.companyInfrastructure.disableSucursalUsuario(data.id).subscribe(() => { });
                //Buscar todos los proyectos por sucursal
                this.companyInfrastructure.allProyectUsuarioByIdSucursal(data.id_sucursal).subscribe((proyectoSucursal) => {
                  //Disable Proyectos asociadas
                  proyectoSucursal.map((proyecto: any) => {
                    this.companyInfrastructure.disableProyectoUsuario(proyecto.id).subscribe(() => { });
                  })
                });

              });
            });


          });
        });
      })

      this.listDeleteSucursal.map((id_sucursal: number) => {
        this.companyInfrastructure.disableSucursal(id_sucursal).subscribe((fa) => { });
      });

      this.listDeleteProyect.map((id_proyecto: number) => {
        this.companyInfrastructure.disableProyect(id_proyecto).subscribe((fa) => { });
      });

      if (company?.empresas.length) {
        company?.empresas.map((emp: any, index: number) => {

          if (emp?.id) {
            this.companyApplication.update(emp.id, emp).subscribe(() => { });
            company?.empresas[index].sucursales.map((suc: any, indexSucursal: number) => {

              if (suc?.id) {
                this.companyInfrastructure.updateSucursal(suc.id, suc).subscribe(() => { });
                company?.empresas[index].sucursales[indexSucursal].proyectos.map((pro: any) => {

                  if (pro?.id) {
                    this.companyInfrastructure.updateProyecto(pro.id, pro).subscribe((res) => { });
                  } else if (!pro?.id) {
                    pro.id_empresa = emp?.id;
                    pro.id_sucursal = suc?.id;
                    let proyect = pro;
                    delete proyect.id;
                    this.companyInfrastructure.insertProyectUnique(proyect).subscribe(() => { });
                  }
                });

              } else if (!suc?.id) {

                suc.id_empresa = emp?.id;
                this.companyInfrastructure.insertSucursalUnique(suc).subscribe((dataSucursal: any) => {

                  company?.empresas[index].sucursales[indexSucursal].proyectos.map((pro: any) => {
                    if (!pro?.id) {
                      pro.id_empresa = dataSucursal?.id_empresa ? dataSucursal?.id_empresa : emp?.id;
                      pro.id_sucursal = dataSucursal?.id ? dataSucursal?.id : suc?.id;
                      this.companyInfrastructure.insertProyectUnique(pro).subscribe(() => { });
                    }
                  });
                });
              }
            })

          } else if (!emp?.id) {
            delete emp.id
            emp.id_propietario = this.empresa.propietario.id;
            this.companyInfrastructure.insertEmpresaUnique(emp).subscribe((dataEmpresa: any) => {
              company?.empresas[index].sucursales.map((suc: any, indexSucursal: number) => {

                suc.id_empresa = dataEmpresa?.id ? dataEmpresa?.id : emp?.id;
                this.companyInfrastructure.insertSucursalUnique(suc).subscribe((dataSucursal: any) => {
                  company?.empresas[index].sucursales[indexSucursal].proyectos.map((pro: any) => {
                    if (!pro?.id) {
                      pro.id_empresa = dataSucursal?.id_empresa ? dataSucursal?.id_empresa : emp?.id;
                      pro.id_sucursal = dataSucursal?.id ? dataSucursal?.id : suc?.id;
                      this.companyInfrastructure.insertProyectUnique(pro).subscribe(() => { });
                    }
                  });
                });
              })
            });
          }
        })
      }

      swal.fire({
        icon: "success",
        title: "Registro Editado",
        text: "Empresa modificada",
        allowOutsideClick: false,
        focusConfirm: false,
        confirmButtonText: "Continuar"
      });
      this.router.navigate(['/company']);

    } else if (!this.idEmpresa) {

      let companyCreate = this.company.value;

      companyCreate.empresas.map((emp: any, index: number) => {
        if (!this.idEmpresa) {
          delete emp.id;
        }
        companyCreate.empresas[index].sucursales = this.listBranch[index];
        companyCreate.empresas[index].modulocheck = this.moduleCheck[index].subtasks;
        companyCreate.empresas[index].moduloestado = this.moduleState[index].subtasks;
      })

      this.companyInfrastructure.insertEmpresa(companyCreate).subscribe({
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
  }


  addCompany(data: any = null) {
    this.list.push(1);
    this.empresas.push(this.createCompany(data));
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
    this.company = this.formBuilder.group({
      nombre: new FormControl(this.empresa?.propietario?.nombre),
      rut: new FormControl(this.empresa?.propietario?.rut, [this.rutService.validaRutForm]),
      direccion: new FormControl(this.empresa?.propietario?.direccion),
      empresas: this.formBuilder.array([], Validators.required)
    });

  }

  createCompany(data: any = null): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(data?.id),
      nombre: new FormControl(data?.nombre),
      rut: new FormControl(data?.rut),
      direccion: new FormControl(data?.direccion),
      color_a: new FormControl(data?.color_a),
      color_b: new FormControl(data?.color_b),
      color_c: new FormControl(data?.color_c),
      plan_comun_usuario_min: new FormControl(data?.plan_comun_usuario_min),
      plan_comun_usuario_max: new FormControl(data?.plan_comun_usuario_max),
      plan_comun_proyecto_min: new FormControl(data?.plan_comun_proyecto_min),
      plan_comun_proyecto_max: new FormControl(data?.plan_comun_proyecto_max),
      plan_comun_almacenamiento_min: new FormControl(data?.plan_comun_almacenamiento_min),
      plan_comun_almacenamiento_max: new FormControl(data?.plan_comun_almacenamiento_max),
      plan_personalizado_usuario_min: new FormControl(data?.plan_personalizado_usuario_min),
      plan_personalizado_usuario_max: new FormControl(data?.plan_personalizado_usuario_max),
      plan_personalizado_proyecto_min: new FormControl(data?.plan_personalizado_proyecto_min),
      plan_personalizado_proyecto_max: new FormControl(data?.plan_personalizado_proyecto_max),
      plan_personalizado_almacenamiento_min: new FormControl(data?.plan_personalizado_almacenamiento_min),
      plan_personalizado_almacenamiento_max: new FormControl(data?.plan_personalizado_almacenamiento_max),
      plan_medida_usuario_min: new FormControl(data?.plan_medida_usuario_min),
      plan_medida_usuario_max: new FormControl(data?.plan_medida_usuario_max),
      plan_medida_proyecto_min: new FormControl(data?.plan_medida_proyecto_min),
      plan_medida_proyecto_max: new FormControl(data?.plan_medida_proyecto_max),
      plan_medida_almacenamiento_min: new FormControl(data?.plan_medida_almacenamiento_min),
      plan_medida_almacenamiento_max: new FormControl(data?.plan_medida_almacenamiento_max),
      estado: new FormControl(data?.estado || 1),
    })
  }

  get empresas(): FormArray {
    return <FormArray>this.company.get('empresas');
  }

  addProyect(row: any, rowBranch: any, rowProyect: any) {
    this.listBranch[row][rowBranch].proyectos.push({ 'nombre': null, 'direccion': null });
  }

  addSucursal(index: number) {
    this.listBranch[index].push({ 'nombre': null, 'proyectos': [{ 'nombre': null, 'direccion': null }] })
  }



  deleteRowSucursal(row: any, dataSucursal: any) {
    if (this.idEmpresa && dataSucursal?.id) {
      this.listDeleteSucursal.push(dataSucursal?.id)
    }
    this.listBranch[row].splice(row, 1);
  }

  deleteRowProyect(row: any, rowBranch: any, rowProyect: any, dataProyect: any) {
    if (this.idEmpresa && dataProyect?.id) {
      this.listDeleteProyect.push(dataProyect.id)
    }
    this.listBranch[row][rowBranch].proyectos.splice(rowProyect, 1);
  }

  deleteCompany(row: any, id: number = 0) {
    if (this.idEmpresa && id) {
      this.listDeleteCompany.push(id)
    }

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
