import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { FormularioPerfilComponent } from '../formulario/formulario-perfil.component';
import { FormularioPerfilService } from 'app/services/perfil/formulario-perfil.service';
import { Perfil } from 'app/model/perfil/perfil.model';
import { PerfilService } from 'app/services/perfil/perfil.service';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioPerfilComponent,
  ]
})

export class CadastrarPerfilComponent {

  public formularioCadastro: Formulario<Perfil> = this.formularioPerfilService.formulario();

  constructor(
    private formularioPerfilService: FormularioPerfilService,
    private perfilService: PerfilService,
    private notificacaoService: NotificacaoService,
  ) {}

  public cadastrarPerfil(): void {
    this.formularioPerfilService.validarFormulario(this.formularioCadastro) && this.executarCadastro()
  }

  private executarCadastro(): void {
    this.perfilService.cadastrar(this.formularioCadastro.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/perfil/listar'),
      error: (_) => this.notificacaoService.erro(),
    });
  }
  
}