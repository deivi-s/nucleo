import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';
import { AuthService } from 'src/app/shared/guards/auth.service';
import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'nucleo-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any;

  companyList: any = [];
  holdingList: any = [];
  sucursalesList: any = [];

  constructor(private layoutService: LayoutService, private readonly router: Router, private userService: AuthService, private readonly userAdmin: UserInfrastructure) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngOnInit(): void {
    this.user = this.userService.user.getValue();

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

  }

  cambiarHolding(data: any) {

  }

  cambiarSucursal(data: any) {

  }

  gotToCreateUser() {
    this.router.navigate(['/user/new']);
  }
}
