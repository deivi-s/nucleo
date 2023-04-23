import { CompanyInfrastructure } from './../../infrastructure/company.infraestructure';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import { UserInfrastructure } from 'src/app/modules/user/infrastructure/user.infraestructure';

@Component({
  selector: 'nucleo-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companyList: any = [];
  holdingList: any = [];
  sucursalesList: any = [];

  filter: FormGroup;

  constructor(private layoutService: LayoutService, private readonly router: Router, private readonly userAdmin: UserInfrastructure, private formBuilder: FormBuilder, private readonly companyInfrastructure: CompanyInfrastructure) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngOnInit(): void {


    this.filter = this.formBuilder.group({
      holding: new FormControl(),
      empresa: new FormControl(),
      sucursal: new FormControl(),
    });

    this.userAdmin.listCompany().subscribe({
      next: (data: any) => {
        this.companyList = data;
      },
    });

    this.userAdmin.listHolding().subscribe({
      next: (data: any) => {
        this.holdingList = data;
      },
    });

    this.userAdmin.allSucursales().subscribe({
      next: (data: any) => {
        this.sucursalesList = data;
      },
    });

  }

  cambiarEmpresa(data: any) {
      this.companyInfrastructure.filter.next(data?.id || 0);
  }

  cambiarHolding(data: any) {

  }

  cambiarSucursal(data: any) {

  }

  gotToCreateCompany() {
    this.router.navigate(['/company/new']);
  }


}
