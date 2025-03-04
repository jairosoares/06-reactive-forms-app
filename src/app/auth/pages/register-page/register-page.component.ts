import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    name:             ['',  [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email:            [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],  // primeiro validacoes sincronas
      [FormUtils.checkingServerResponse]                                  // depois validacoes assincronas
    ],
    username:         [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(FormUtils.notOnlySpacesPattern),
        FormUtils.notStrider
      ]
    ],
    password:         ['',  [Validators.required, Validators.minLength(6)]],
    confirmPassword:  ['',  [Validators.required, Validators.minLength(6)]],
  }, { /* para validacao de formulario nao de campos*/
    validators: [
      FormUtils.isBothFieldsEqual('password', 'confirmPassword')
    ]
  });

  onCreate() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log("Usuario criado!");
  }
}
