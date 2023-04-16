import { Component, OnInit } from '@angular/core';
import { ResultPage } from 'src/app/core/domain/base.interface';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';
import { UserApplication } from '../../application/user.application';
import { User } from '../../domain/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';
import swal from 'sweetalert2';

@Component({
  selector: 'nucleo-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  totalRecords = 0;
  pageSize = 10;
  currentPage = 0;

  metaData: MetaData[] = [
    { field: 'nombre', title: 'Nombre' },
    { field: 'apellidos', title: 'Apellido' },
    { field: 'rut', title: 'Rut' },
    { field: 'email', title: 'Correo' },
    { field: 'telefono', title: 'Telefono' },
  ];

  dataSource: any = [];

  constructor(
    private readonly router: Router,
    private readonly userApplication: UserApplication,
    private readonly userAdmin: UserInfrastructure,
    private readonly routerActive: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.changePage(0);

    
      
  }

  changePage(pageIndex: number) {
    this.userAdmin.listUser(pageIndex).subscribe({
      next: (data: any) => {
        this.dataSource = data.users;
        this.totalRecords = data.tamanio;
        this.currentPage = pageIndex;
      },
    });
  }

  editar(data: any) {
    data.edit = true;
    this.userAdmin.userData.next(data);
    this.router.navigate([`/user/edit/${data.id}/`]);
  }

  disable(id: number) {
    swal.fire({
      title: 'Eliminar usuario',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.value) {
        this.userAdmin.delete(id).subscribe({
          next: () => {
            this.changePage(this.currentPage);
          },
        });

      }
    });
  }
}
