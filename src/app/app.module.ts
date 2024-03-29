import { UserInfrastructure } from './modules/user/infrastructure/user.infraestructure';
import { UserApplication } from './modules/user/application/user.application';
import { UserModule } from './modules/user/user.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/interfaces/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Paginator } from './shared/classes/paginator';
import { LayoutModule } from './config/modules/layout.module';
import { LAYOUT_CONSTANTS } from './config/constants/layour.constans';
import { CompanyApplication } from './modules/company/application/company.application';
import { CompanyInfrastructure } from './modules/company/infrastructure/company.infraestructure';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule)/* ,
    canActivate: [CheckLoginGuard] */
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule)/* ,
    canActivate: [CheckLoginGuard] */
  },
  {
    path: '**',
    redirectTo: '/',
  },
];


const application = [
  UserApplication,
  CompanyApplication
];
const infrastructure = [
  UserInfrastructure,
  CompanyInfrastructure
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
    LayoutModule.forRoot(LAYOUT_CONSTANTS),
    SharedModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: Paginator },
  ...infrastructure,
  ...application],
  bootstrap: [AppComponent],
})
export class AppModule { }
