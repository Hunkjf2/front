import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sistema } from 'app/model/sistema/sistema.model';
import { Formulario } from 'app/shared/models/model/formulario.model';

@Injectable({ 
  providedIn: 'root' 
})
export class FormularioSistemaService {

  constructor(private readonly fb: FormBuilder) {}

  public formulario(): Formulario<Sistema> {
    return this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: [''],
      clients: [[], [Validators.required]],
    }) as Formulario<Sistema>;
  }

   public validarFormulario(formulario: Formulario<Sistema>): boolean {
    if (formulario.invalid) {
      formulario.markAllAsTouched();
      Object.keys(formulario.controls).forEach(key => {
        const control = formulario.get(key);
        if (control) {
          control.updateValueAndValidity();
          control.markAsTouched();
        }
      });
      return false;
    }
    return true;
  }

}