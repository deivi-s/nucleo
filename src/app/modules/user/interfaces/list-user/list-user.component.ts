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
    { field: 'empresa', title: 'Empresa' },
    { field: 'fecha', title: 'Fecha de ingreso' },
    { field: 'estado', title: 'Estado' },
    { field: 'usuarios', title: 'Usuarios' },
    { field: 'modulo', title: 'Módulos' },
  ];

  dataSource: any = [{
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }, {
    empresa: 'Empresa 1',
    fecha: '01 - 01 -2023',
    estado: 'Activo',
    usuarios: '1.500',
    modulo: '3'
  }];

  constructor() { }

  ngOnInit(): void {

  }

}
