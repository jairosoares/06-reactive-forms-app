import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  imports: [JsonPipe, ReactiveFormsModule],
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required, Validators.minLength(5) ]],
      ['Dead Stranding', [Validators.required, Validators.minLength(5) ]],
    ],
    Validators.minLength(3))
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  newFavorite = new FormControl('', Validators.required);

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    //this.favoriteGames.push(newGame);
    this.favoriteGames.push(this.fb.control( newGame, Validators.required));

    // limpa o campo
    this.newFavorite.reset();

  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log("Tudo valido");
    //this.myForm.reset();
  }


}
