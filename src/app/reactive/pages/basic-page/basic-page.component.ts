import { reactiveRoutes } from './../../country.routes';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class BasicPageComponent {


  private fb = inject(FormBuilder);

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

  isValidField(fieldName: string): boolean | null {
    return (
      this.myForm.controls[fieldName].errors &&
      this.myForm.controls[fieldName].touched
    );
  }

  getFieldError( fieldName:string): string | null {
    if ( !this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo é requerido';
        case 'minlength':
          return `Minimo de ${ errors['minlength'].riqueredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${ errors['min'].min}`;
      }
    }
    console.log('nulo?');

    return null;
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log("Tudo valido");
    this.myForm.reset();
  }

}
