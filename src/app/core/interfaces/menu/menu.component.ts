import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/guards/auth.service';


@Component({
  selector: 'nucleo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: any;
  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '') ;
    this.user =  user ? user : this.userService.user.getValue();
  }

}
