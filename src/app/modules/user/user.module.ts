
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
import { SuperAdministradorUserComponent } from './interfaces/super-administrador-user/super-administrador-user.component';
import { NewSuperUserComponent } from './interfaces/new-super-user/new-super-user.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RutModule } from 'rut-chileno';

@NgModule({
  declarations: [
    DashboardComponent, ListUserComponent, FormUserComponent, UserComponent, NewUserComponent, ReporteUserComponent, SuperAdministradorUserComponent, NewSuperUserComponent
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
    MatRadioModule,
    MatExpansionModule,
    RutModule
  ]
})
export class UserModule { }
