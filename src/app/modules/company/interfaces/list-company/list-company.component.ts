import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';
import swal from 'sweetalert2';
import { CompanyInfrastructure } from '../../infrastructure/company.infraestructure';

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

  constructor(private readonly router: Router, private readonly companyInfrastructure: CompanyInfrastructure,
  ) { }

  ngOnInit(): void {
    this.changePage(0);
  }

  changePage(pageIndex: number) {
    this.companyInfrastructure.listEmpresa(pageIndex).subscribe({
      next: (data: any) => {
        this.dataSource = data.users;
        this.totalRecords = data.tamanio;
        this.currentPage = pageIndex;
        
      },
    });
  }

  editar(id: any) {
    this.router.navigate([`/company/edit/${id}/`]);
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
         this.companyInfrastructure.deleteEmpresa(id).subscribe({
           next: () => {
             this.changePage(this.currentPage);
           },
         });
 
       }
    });
  }

}
