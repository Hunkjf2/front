import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Perfil } from 'app/model/perfil/perfil.model';
import { Formulario } from 'app/shared/models/model/formulario.model';

@Injectable({ 
  providedIn: 'root' 
})
export class FormularioPerfilService {

  constructor(private fb: FormBuilder) {}

  public formulario(): Formulario<Perfil> {
    return this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      description: [''],
    }) as Formulario<Perfil>;
  }

  public validarFormulario(formulario: Formulario<Perfil>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}