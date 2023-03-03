import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'nucleo-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private layoutService: LayoutService, private readonly router: Router) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngOnInit(): void {
  }

  gotToCreateUser() {
    this.router.navigate(['/user/new']);
  }
}
