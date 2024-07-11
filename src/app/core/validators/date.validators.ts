import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador para edad mayor a 130 años
export function ageMaxValidator(maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age > maxAge) {
      return { ageMax: true };
    }
    return null;
  };
}

// Validador para edad menor a 18 años
export function ageMinValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < minAge) {
      return { ageMin: true };
    }
    return null;
  };
}

// Validador para fecha mayor a la fecha actual
export function dateNotInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (inputDate > today) {
      return { dateNotInFuture: true };
    }
    return null;
  };
}
