import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Formulario } from 'app/shared/models/model/formulario.model';

@Injectable({ 
  providedIn: 'root' 
})
export class FormularioUsuarioService {

  constructor(private fb: FormBuilder) {}

  public formulario(): Formulario<any> {
    return this.fb.group({
      id: [],
      login: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      senha: ['', [Validators.minLength(8)]],
      senhaTemporaria: [false]
    }) as Formulario<any>;
  }

  public validarFormulario(formulario: Formulario<any>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}