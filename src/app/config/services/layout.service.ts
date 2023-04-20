import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILayout } from '../interfaces/layout.interface';
import { LAYOUT_TOKEN } from '../tokens/layout.token';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly configBehaviorSubject !: BehaviorSubject<ILayout>;
  constructor(@Inject(LAYOUT_TOKEN) private layout: ILayout) {
    this.configBehaviorSubject = new BehaviorSubject<ILayout>(layout);
  }

  set configuration(value: Partial<ILayout>) {
    let config = this.configBehaviorSubject.getValue();
    config = Object.assign(config, value);
    this.configBehaviorSubject.next(config);
  }

  get configuration(): any {
    return this.configBehaviorSubject.asObservable();
  }
}
