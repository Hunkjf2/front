import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'app/model/usuario/usuario.model';
import { Formulario } from 'app/shared/models/model/formulario.model';

@Injectable({ 
  providedIn: 'root' 
})
export class FormularioUsuarioService {

  constructor(private fb: FormBuilder) {}

  public formulario(): Formulario<Usuario> {
    return this.fb.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      emailVerified: [false],
      enabled: [true],
      login: ['', [Validators.required]],
      username: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      attributes: this.fb.group({
        cpf: ['', [Validators.required]],
        phone: ['']
      }),
      credentials: this.fb.array([
        this.fb.group({
          type: ['password'],
          value: ['', [Validators.minLength(8)]],
          temporary: [false]
        })
      ])
    }) as Formulario<Usuario>;
  }

  public validarFormulario(formulario: Formulario<Usuario>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}