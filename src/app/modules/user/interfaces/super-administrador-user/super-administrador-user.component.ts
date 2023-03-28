import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaData } from 'src/app/shared/interfaces/meta-data.interface';

@Component({
  selector: 'nucleo-super-administrador-user',
  templateUrl: './super-administrador-user.component.html',
  styleUrls: ['./super-administrador-user.component.scss']
})
export class SuperAdministradorUserComponent implements OnInit {

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


  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  gotToCreateAdministrador() {
    this.router.navigate(['/user/administrator/new']);
  }

}
