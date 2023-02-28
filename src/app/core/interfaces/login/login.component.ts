import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'nucleo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private layoutService: LayoutService, private readonly router: Router) {
    this.layoutService.configuration = { header: false, menu: false };
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  validar(){
    console.log('validar');
    this.router.navigate(['/company']);
  }

}
