import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/interfaces/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormCompanyComponent } from './modules/company/interfaces/form-company/form-company.component';
import { ListCompanyComponent } from './modules/company/interfaces/list-company/list-company.component';
import { CompanyComponent } from './modules/company/interfaces/company/company.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule)
  },
  {
    path: '**',
    redirectTo: '/',
  },
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
