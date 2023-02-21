import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';

import { FormLoginComponent } from './interfaces/components/form-login/form-login.component';
import { LoginComponent } from './interfaces/login/login.component';
import { HeaderComponent } from './interfaces/header/header.component';
import { MenuComponent } from './interfaces/menu/menu.component';


@NgModule({
  declarations: [FormLoginComponent, LoginComponent, HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    FlexLayoutModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    LoginComponent
  ]
})
export class CoreModule { }
