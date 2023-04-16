import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'nucleo-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {

  metaData: MetaData[] = [
    { field: 'nombre', title: 'Empresa' },
    { field: 'rut', title: 'Rut' },
    { field: 'direccion', title: 'Dirección' },
    { field: 'estado', title: 'Estado' },
    { field: 'createdAt', title: 'Fecha de ingreso' }
  ];

  dataSource: any = [];

  totalRecords = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private readonly router: Router, private readonly userAdmin: UserInfrastructure,
  ) { }

  ngOnInit(): void {
    this.changePage(0);
  }

  changePage(pageIndex: number) {
    console.log(11);
    this.userAdmin.listEmpresa(pageIndex).subscribe({
      next: (data: any) => {
        this.dataSource = data.users;
        this.totalRecords = data.tamanio;
        this.currentPage = pageIndex;
        
      },
    });
  }

  editar(data: any) {
    /*  data.edit = true;
     this.userAdmin.userData.next(data);
     this.router.navigate([`/user/edit/${data.id}/`]); */

    this.router.navigate([`/company/edit/${data.id}/`]);
  }

  disable(id: number) {
    swal.fire({
      title: 'Eliminar empresa',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Continuar'
    }).then((result) => {
       if (result.value) {
         this.userAdmin.deleteEmpresa(id).subscribe({
           next: () => {
             this.changePage(this.currentPage);
           },
         });
 
       }
    });
  }

}
