import { CompanyComponent } from './interfaces/company/company.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCompanyComponent } from './interfaces/new-company/new-company.component';
import { DashboardPrincipalComponent } from './interfaces/dashboard-principal/dashboard-principal.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  },
  {
    path: 'new',
    component: NewCompanyComponent
  },
  {
    path: 'edit/:id',
    component: NewCompanyComponent
  },
  {
    path: 'dashboard',
    component: DashboardPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
