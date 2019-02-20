import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from 'shared'
import { DynaFormBuilder } from 'src/dyna-form/dyna-form.builder';
import { BaseComponent } from '../baseComponent';
import { I18nLoginPage } from '../shared/interfaces/i18n.interface'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent {
  form: FormGroup;
  constructor(private router: Router, private dynaFB: DynaFormBuilder, private authService: AuthService) {
    super()
    this.dynaFB.buildFormFromClass(LoginRequest).then(form => this.form = form);
  }

  login(e) {
    this.validateAllFields(this.form)
    if (!this.form.valid) {
      e.preventDefault();
      return this.validateAllFields(this.form)
    }
    this.authService.login(this.form.value).then(user => {
      this.router.navigate(['/' + window.location.pathname.replace('login/', ''), {}]);
    })

    e.preventDefault();
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
