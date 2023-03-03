import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUserComponent } from './reporte-user.component';

describe('ReporteUserComponent', () => {
  let component: ReporteUserComponent;
  let fixture: ComponentFixture<ReporteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
