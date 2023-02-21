import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Router } from '@angular/router';

type VisibleInputPassword = 'password' | 'text';

@Component({
  selector: 'nucleo-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {

  styleFormField: MatFormFieldAppearance = 'outline';
  visibleInputPassword: VisibleInputPassword = 'password';
  group: FormGroup;
  patternEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(private readonly router: Router) {
    this.group = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.patternEmail),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void { }

  login() { }

  passwordVisible() {
    this.visibleInputPassword = this.visibleInputPassword === 'password' ? 'text' : 'password';
  }
}
