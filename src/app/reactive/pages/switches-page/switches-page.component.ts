import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log("Tudo valido");
  }

 }
