import { inject } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { UserValidationService } from '../auth/services/user-validation.service';

async function sleep() {
  return new Promise( (resolve) => {
    setTimeout( () => {
      resolve(true);
    }, 2500)
  });
}

export class FormUtils {

  static namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern: string = '^[a-zA-Z0-9]+$';

  static isValidField( form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }


  static getFieldError( form: FormGroup, fieldName:string): string | null {
    if ( !form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number) {
    if ( !formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static getTextError(errors: ValidationErrors) {

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo é requerido';
        case 'minlength':
          return `Minimo de ${ errors['minlength'].riqueredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${ errors['min'].min}`;
        case 'email':
          return `E-mail inválido`;
        case 'emailKkk':
          return `Este e-mail já está sendo usado por outro usuario`;
        case 'noStrider':
          return `A palavra strider nao eh permitida`;
        case 'pattern':
          return FormUtils.getPatternError(errors);
      }
    }
    return null;

  }

  static getPatternError(errors: ValidationErrors) {
    const pattern = errors['pattern'].requiredPattern;
    if (pattern.includes(FormUtils.namePattern)) {
      return 'Digite nome e sobrenome válidos';
    }
    if (pattern.includes(FormUtils.emailPattern)) {
      return 'Digite um e-mail válido';
    }
    if (pattern.includes(FormUtils.notOnlySpacesPattern)) {
      return 'Não pode conter apenas espaços';
    }
    return 'Formato inválido';
  }

  static isBothFieldsEqual(fieldA: string, fieldB: string) {
    return (form: AbstractControl) => {
      const fieldAValue = form.get(fieldA)?.value;
      const fieldBValue = form.get(fieldB)?.value;
      return fieldAValue === fieldBValue ? null : {passwordNotEqual: true};
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep(); // simula uma busca no servidor
    const formValue = control.value;
    if (formValue === 'foo@bar.com') {
      return {
        emailKkk: true,
      }
    }
    return null;
  }

  /**
   * Simulando uma requisicao real na busca se email ja esta sendo usado
   * @param control
   * @returns
   */
  static async checkingServerResponse2(control: AbstractControl): Promise<ValidationErrors | null> {
    if (!control.value) return null;

    try {
      const userValidationService = inject(UserValidationService);
      const emailExists = await userValidationService.checkEmailExists(control.value);
      if (emailExists) {
        return {
          emailKkk: true,
        };
      }
      return null;
    } catch (error) {
      console.error('Erro na validação do email:', error);
      return null;
    }
  }


  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value?.toLowerCase() || '';
    if (formValue.includes('strider')) {
      return {
        noStrider: true,
      }
    }
    return null;
  }


}
