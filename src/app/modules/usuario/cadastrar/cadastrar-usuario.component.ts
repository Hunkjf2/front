import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { FormularioUsuarioService } from 'app/services/usuario/formulario-usuario.service';
import { UsuarioService } from 'app/services/usuario/usuario.service';
import { FormularioUsuarioComponent } from '../formulario/formulario-usuario.component';
import { Usuario } from 'app/model/usuario/usuario.model';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioUsuarioComponent,
  ]
})

export class CadastrarUsuarioComponent {

  public formularioCadastro: Formulario<Usuario> = this.formularioUsuarioService.formulario(); 

  constructor(
    private formularioUsuarioService: FormularioUsuarioService,
    private usuarioService: UsuarioService,
    private notificacaoService: NotificacaoService,
  ) {}

  public cadastarUsuario(): void {
    this.formularioUsuarioService.validarFormulario(this.formularioCadastro) && this.executarCadastro()
  }

  private executarCadastro(): void {
    this.usuarioService.cadastrar(this.formularioCadastro.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/pessoa/listar'),
      error: (_) => this.notificacaoService.erro(),
    });
  }
  
}