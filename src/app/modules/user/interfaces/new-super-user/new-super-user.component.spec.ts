import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuperUserComponent } from './new-super-user.component';

describe('NewSuperUserComponent', () => {
  let component: NewSuperUserComponent;
  let fixture: ComponentFixture<NewSuperUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuperUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
