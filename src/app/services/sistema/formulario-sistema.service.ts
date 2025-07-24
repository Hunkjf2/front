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
      clients: this.fb.array([]),
    }) as Formulario<Sistema>;
  }

  public validarFormulario(formulario: Formulario<Sistema>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}