import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value ;

    if (file) {
      const fileType = file.split('.').pop();
      if (!allowedTypes.includes(fileType)) {
        return { invalidFileType: true };
      }
    }
    return null;
  };
}
