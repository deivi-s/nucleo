import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nucleo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

}
