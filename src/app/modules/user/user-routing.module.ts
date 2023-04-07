import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSuperUserComponent } from './interfaces/new-super-user/new-super-user.component';
import { NewUserComponent } from './interfaces/new-user/new-user.component';
import { UserComponent } from './interfaces/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  {
    path: 'edit/:id',
    component: NewUserComponent
  },
  {
    path: 'administrator/new',
    component: NewSuperUserComponent
  },
  {
    path: 'administrator/edit/:id',
    component: NewSuperUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
