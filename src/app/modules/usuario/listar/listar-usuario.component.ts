import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatPaginatorIntPtBr } from 'app/core/paginator/mat-paginator-ptBr';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';
import { FiltroComponent } from 'app/shared/components/filtro/filtro.component';
import { Usuario } from 'app/model/usuario/usuario.model';
import { UsuarioService } from 'app/services/usuario/usuario.service';
import { ModalConfirmacaoService } from 'app/shared/services/modal-confirmacao.service';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
    selector: 'app-listar-usuario',
    templateUrl: 'listar-usuario.component.html',
    imports: [
        CabecalhoComponent,
        CommonModule,
        MatCardModule,
        HttpClientModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        NgxMaskPipe,
        FiltroComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntPtBr },
        provideNgxMask()
    ],
    standalone: true,
})
export class ListarUsuarioComponent extends FiltroComponent implements OnInit {

    public readonly colunas: string[] = ['username', 'attributes.cpf', 'email', 'actions'];

    constructor(private usuarioService: UsuarioService,
                private modalConfirmacaoService: ModalConfirmacaoService,
                private notificacaoService: NotificacaoService) {
        super();
    }

    public ngOnInit(): void {
        this.carregarUsuarios();
    }

    private carregarUsuarios(): void {
        this.usuarioService.listarTodos().subscribe({
            next: (usuarios: Usuario[]) => this.dadosTabela.data = usuarios,
            error: (error: any) => {
                this.notificacaoService.erro(error.message || MensagemSistema.ERRO);
            }
        });
    }

    public deletarUsuario(id: string): void {
        this.modalConfirmacaoService.open({
            title:  'Excluir Usuário',
            message: MensagemSistema.CONFIRMACAO_EXCLUSAO
            }).afterClosed()
              .subscribe((opcao: string) => { 
                    opcao === 'Confirmar' && this.executarDelecao(id);
            });
    }
    
    private executarDelecao(id: string): void {
        this.usuarioService.remover(id).subscribe({
            next: (_) => {
                this.notificacaoService.sucesso();
                this.carregarUsuarios();
            },
            error: (error: any) => this.notificacaoService.erro(error.message || MensagemSistema.ERRO)
        });
    }
    
}