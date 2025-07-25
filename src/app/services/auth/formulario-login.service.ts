import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginCredentials } from 'app/model/auth/login';
import { Formulario } from 'app/shared/models/model/formulario.model';

@Injectable({ 
  providedIn: 'root' 
})
export class FormularioLoginService {

  constructor(private readonly _fb: FormBuilder) {}

  public formulario(): Formulario<LoginCredentials> {
    return this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }) as Formulario<LoginCredentials>;
  }

  public validarFormulario(formulario: Formulario<LoginCredentials>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}