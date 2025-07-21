import { FormGroup } from '@angular/forms';

export type Formulario<E> = FormGroup & {
  value: E;
};