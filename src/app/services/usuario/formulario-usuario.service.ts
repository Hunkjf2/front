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
      login: ['', [Validators.required]],
      username: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      senha: ['', [Validators.minLength(8)]],
      senhaTemporaria: [false]
    }) as Formulario<Usuario>;
  }

  public validarFormulario(formulario: Formulario<Usuario>): boolean {
    return formulario.invalid ? (formulario.markAllAsTouched(), false) : true;
  }

}