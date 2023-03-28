import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdministradorUserComponent } from './super-administrador-user.component';

describe('SuperAdministradorUserComponent', () => {
  let component: SuperAdministradorUserComponent;
  let fixture: ComponentFixture<SuperAdministradorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdministradorUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdministradorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
