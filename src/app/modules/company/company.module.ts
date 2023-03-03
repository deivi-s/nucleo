import { ListCompanyComponent } from './interfaces/list-company/list-company.component';
import { FormCompanyComponent } from './interfaces/form-company/form-company.component';
import { CompanyComponent } from './interfaces/company/company.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardComponent } from './interfaces/dashboard/dashboard.component';
import { NewCompanyComponent } from './interfaces/new-company/new-company.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    FormCompanyComponent,
    ListCompanyComponent,
    CompanyComponent,
    DashboardComponent,
    NewCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule
  ]
})
export class CompanyModule { }
