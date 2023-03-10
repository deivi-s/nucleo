
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './interfaces/dashboard/dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './interfaces/list-user/list-user.component';
import { FormUserComponent } from './interfaces/form-user/form-user.component';
import { UserComponent } from './interfaces/user/user.component';
import { NewUserComponent } from './interfaces/new-user/new-user.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReporteUserComponent } from './interfaces/reporte-user/reporte-user.component';

@NgModule({
  declarations: [
    DashboardComponent, ListUserComponent, FormUserComponent, UserComponent, NewUserComponent, ReporteUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    UserRoutingModule,
    MatRadioModule
  ]
})
export class UserModule { }
