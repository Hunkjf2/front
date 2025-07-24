import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { Sistema } from 'app/model/sistema/sistema.model';
import { SistemaService } from 'app/services/sistema/sistema.service';
import { FormularioSistemaService } from 'app/services/sistema/formulario-sistema.service';
import { FormularioSistemaComponent } from '../formulario/formulario-sistema.component';

@Component({
  selector: 'app-cadastrar-sistema',
  templateUrl: './cadastrar-sistema.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioSistemaComponent,
  ]
})

export class CadastrarSistemaComponent {

  public formularioCadastro: Formulario<Sistema> = this.formularioSistemaService.formulario();

  constructor(
    private readonly formularioSistemaService: FormularioSistemaService,
    private readonly sistemaService: SistemaService,
    private readonly notificacaoService: NotificacaoService,
  ) {}

  public cadastrarSistema(): void {
    this.formularioSistemaService.validarFormulario(this.formularioCadastro) && this.executarCadastro()
  }

  private executarCadastro(): void {
    this.sistemaService.cadastrar(this.formularioCadastro.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/perfil/listar'),
      error: (_) => this.notificacaoService.erro(),
    });
  }
  
}