import { ListCompanyComponent } from './interfaces/list-company/list-company.component';
import { FormCompanyComponent } from './interfaces/form-company/form-company.component';
import { CompanyComponent } from './interfaces/company/company.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SharedModule } from '../../shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FormCompanyComponent,
    ListCompanyComponent,
    CompanyComponent
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
  ]
})
export class CompanyModule { }
