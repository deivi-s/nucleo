import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';
import swal from 'sweetalert2';

@Component({
  selector: 'nucleo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: FormGroup;
  submited = false;

  constructor(private layoutService: LayoutService, private readonly router: Router, private formBuilder: FormBuilder, private readonly userAdmin: UserInfrastructure,) {
    this.layoutService.configuration = { header: false, menu: false };

  }

  ngOnInit(): void {
    this.loadForm();
  }


  loadForm() {
    this.users = this.formBuilder.group({
      usuario: new FormControl(null, Validators.required),
      clave: new FormControl(null, Validators.required)
    });
  }


  validar() {
    this.submited = true;
    try {
      if (!this.users.valid) {
        return;
      }

      this.userAdmin.login(this.users.value).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/company/dashboard']);
            return;
          } 
         
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

    } catch (error) {
      swal.fire({
        icon: "warning",
        title: "Ocurrio un Error",
        text: "Intenta nuevamente",
        allowOutsideClick: false,
        focusConfirm: false,
        confirmButtonText: "Continuar"
      });
    }
  }

}
