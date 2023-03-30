import { Component, OnInit } from '@angular/core';
import { ResultPage } from 'src/app/core/domain/base.interface';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';
import { UserApplication } from '../../application/user.application';
import { User } from '../../domain/user';

@Component({
  selector: 'nucleo-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  totalRecords = 9;
  pageSize = 10;

  metaData: MetaData[] = [
    { field: 'nombre', title: 'Nombre' },
    { field: 'apellidos', title: 'Apellido' },
    { field: 'rut', title: 'Rut' },
    { field: 'email', title: 'Correo' },
    { field: 'telefono', title: 'Sucursal' },
  ];

  dataSource: any = [];
  /* 
    dataSource: any = [{
      nombre: 'Deivi',
      apellido: 'Arocutipa',
      rut: '00.000.000-0',
      correo: 'Contacto.apellido@empresa.com',
      sucursal: 'Chile'
    },
    {
      nombre: 'Deivi',
      apellido: 'Arocutipa',
      rut: '00.000.000-0',
      correo: 'Contacto.apellido@empresa.com',
      sucursal: 'Chile'
    }, {
      nombre: 'Deivi',
      apellido: 'Arocutipa',
      rut: '00.000.000-0',
      correo: 'Contacto.apellido@empresa.com',
      sucursal: 'Chile'
    }]; */

  constructor(
    private readonly userApplication: UserApplication
  ) {

    this.changePage(0);
  }

  ngOnInit(): void {

  }

  changePage(pageIndex: number) {
    this.userApplication.list().subscribe({
      next: (data:any) => {
        this.dataSource = data
      },
    });
    /*     this.dataSource = this.dataSourceOriginal.slice(
      pageIndex * this.pageSize,
      pageIndex * this.pageSize + this.pageSize
    ); */
  }
}
