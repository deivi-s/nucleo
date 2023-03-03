import { Component, OnInit } from '@angular/core';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';

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
    { field: 'apellido', title: 'Apellido' },
    { field: 'rut', title: 'Rut' },
    { field: 'correo', title: 'Correo' },
    { field: 'sucursal', title: 'Sucursal' },
  ];
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
  }];

  constructor() { }

  ngOnInit(): void {

  }

}
