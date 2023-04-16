import { environment } from 'src/environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApplication } from '../../application/user.application';
import swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import { RutService } from 'rut-chileno';

@Component({
  selector: 'nucleo-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @ViewChild('fileInput') fileInput !: ElementRef;
  fileAttr = 'Nombre archivo seleccionado';
  users: FormGroup;
  photo: string;
  submited = false;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  userDataAdmin: any;

  constructor(
    private readonly userApplication: UserApplication,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly userAdmin: UserInfrastructure,
    private routerActive: ActivatedRoute,
    private rutService: RutService
  ) { this.loadForm(); }

  ngOnInit(): void {
    this.validateEdit();
    this.loadForm();


   /*  let enc = CryptoJS.AES.encrypt('123aa', environment.password).toString();
    console.log(enc);
    let res = CryptoJS.AES.decrypt(enc, environment.password).toString(CryptoJS.enc.Utf8);

    console.log(res);
 */
  }

  validateEdit() {
    this.userDataAdmin = this.userAdmin.userDataAdmin.getValue();
    this.userAdmin.userDataAdmin.next(null);
  }

  loadForm() {
    this.users = this.formBuilder.group({
      nombre: new FormControl(this.userDataAdmin?.nombre, Validators.required),
      apellidos: new FormControl(this.userDataAdmin?.apellidos, Validators.required),
      rut: new FormControl(this.userDataAdmin?.rut, [Validators.required, this.rutService.validaRutForm]),
      email: new FormControl(this.userDataAdmin?.email, [Validators.required, Validators.email]),
      telefono: new FormControl(this.userDataAdmin?.telefono),
      contacto: new FormControl(this.userDataAdmin?.contacto),
      clave: new FormControl(1),
      tipo: new FormControl(1),
      foto: new FormControl(''),
    });
  }

  cancelar() {
    this.router.navigate(['/user']);
  }

  guardar() {
    this.submited = true;
    try {
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
        const id = Number(this.routerActive.snapshot.paramMap.get('id'));
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
        });
      } else {
        this.userApplication.insert(this.users.value).subscribe({
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
        });
      }


    } catch (error) {

    }
  }

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

}
