import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { FormularioUsuarioService } from 'app/services/usuario/formulario-usuario.service';
import { UsuarioService } from 'app/services/usuario/usuario.service';
import { FormularioUsuarioComponent } from '../formulario/formulario-usuario.component';
import { carregarDados } from 'app/shared/utils/carregar-dados';
import { Usuario } from 'app/model/usuario/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormularioUsuarioComponent,
  ]
})

export class EditarUsuarioComponent {

  public formularioEdicao: Formulario<Usuario> = this.formularioUsuarioService.formulario();
  private readonly usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

  constructor(
    private formularioUsuarioService: FormularioUsuarioService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private notificacaoService: NotificacaoService,
  ) {
  }

  public ngOnInit(): void {
    carregarDados(this.formularioEdicao, this.usuario);
  }

  public atualizarUsuario(): void {
    this.formularioUsuarioService.validarFormulario(this.formularioEdicao) && this.executarAtualizacao();
  }

  private executarAtualizacao(): void {
    this.usuarioService.atualizar(this.formularioEdicao.value).subscribe({
      next: (_) => this.notificacaoService.sucessoNavegacao('/usuario/listar'),
      error: (_) => this.notificacaoService.erro()
    });
  }

}