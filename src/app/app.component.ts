import { Component } from '@angular/core';
import { ILayout } from './config/interfaces/layout.interface';
import { LayoutService } from './config/services/layout.service';

@Component({
  selector: 'nucleo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nucleo';
  isLoading = false;

  configLayout !: ILayout;

  constructor(private layoutService: LayoutService) {
    layoutService.configuration.subscribe((config: ILayout) => {
      this.configLayout = config;
    });

  }
}
