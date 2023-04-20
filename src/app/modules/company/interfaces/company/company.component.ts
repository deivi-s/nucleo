import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/services/layout.service';

@Component({
  selector: 'nucleo-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(private layoutService: LayoutService, private readonly router: Router) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  ngOnInit(): void {
  }

  gotToCreateCompany(){
    this.router.navigate(['/company/new']);
  }


}
