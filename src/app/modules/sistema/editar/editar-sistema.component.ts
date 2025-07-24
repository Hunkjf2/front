import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { carregarDados } from 'app/shared/utils/carregar-dados';
import { FormularioSistemaComponent } from '../formulario/formulario-sistema.component';
import { Sistema } from 'app/model/sistema/sistema.model';
import { FormularioSistemaService } from 'app/services/sistema/formulario-sistema.service';
import { SistemaService } from 'app/services/sistema/sistema.service';

@Component({
  selector: 'app-editar-sistema',
  templateUrl: './editar-sistema.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioSistemaComponent,
  ]
})

export class EditarSistemaComponent {

  public formularioEdicao: Formulario<Sistema> = this.formularioSistemaService.formulario();
  private readonly sistema: Sistema = this.activatedRoute.snapshot.data['sistema'];

  constructor(
    private readonly formularioSistemaService: FormularioSistemaService,
    private readonly sistemaService: SistemaService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificacaoService: NotificacaoService,
  ) {
  }

  public ngOnInit(): void {
    carregarDados(this.formularioEdicao, this.sistema);
  }

  public atualizarSistema(): void {
    this.formularioSistemaService.validarFormulario(this.formularioEdicao) && this.executarAtualizacao();
  }

  private executarAtualizacao(): void {
    this.sistemaService.atualizar(this.formularioEdicao.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/sistema/listar'),
      error: (_) => this.notificacaoService.erro()
    });
  }

}