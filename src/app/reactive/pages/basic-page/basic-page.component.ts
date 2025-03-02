import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class BasicPageComponent {


  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(3)] ],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  /*
  // Feio!
  myForm = new FormGroup({
    name: new FormControl(''),
    price:  new FormControl(0),
    inStorage: new FormControl(0),
  })
  */

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log("Tudo valido");
    this.myForm.reset();
  }

}
