import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
