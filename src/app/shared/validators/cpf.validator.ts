import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isValidCpf } from '@brazilian-utils/validators';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isValidCpf(control.value) ? null : { invalidCpf: true };
  };
}