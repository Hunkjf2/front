import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { carregarDados } from 'app/shared/utils/carregar-dados';
import { FormularioPerfilComponent } from '../formulario/formulario-perfil.component';
import { Perfil } from 'app/model/perfil/perfil.model';
import { FormularioPerfilService } from 'app/services/perfil/formulario-perfil.service';
import { PerfilService } from 'app/services/perfil/perfil.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioPerfilComponent,
  ]
})

export class EditarPerfilComponent {

  public formularioEdicao: Formulario<Perfil> = this.formularioPerfilService.formulario();
  private readonly perfil: Perfil = this.activatedRoute.snapshot.data['perfil'];

  constructor(
    private formularioPerfilService: FormularioPerfilService,
    private perfilService: PerfilService,
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService,
  ) {
  }

  public ngOnInit(): void {
    carregarDados(this.formularioEdicao, this.perfil);
  }

  public atualizarPerfil(): void {
    this.formularioPerfilService.validarFormulario(this.formularioEdicao) && this.executarAtualizacao();
  }

  private executarAtualizacao(): void {
    this.perfilService.atualizar(this.formularioEdicao.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/perfil/listar'),
      error: (_) => this.notificacaoService.erro()
    });
  }

}