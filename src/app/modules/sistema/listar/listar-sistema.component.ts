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
import { ModalConfirmacaoService } from 'app/shared/services/modal-confirmacao.service';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';
import { SistemaService } from 'app/services/sistema/sistema.service';
import { Sistema } from 'app/model/sistema/sistema.model';

@Component({
    selector: 'app-listar-sistema',
    templateUrl: 'listar-sistema.component.html',
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
        FiltroComponent
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntPtBr },
    ],
    standalone: true,
})
export class ListarSistemaComponent extends FiltroComponent implements OnInit {

    public readonly colunas: string[] = ['name', 'description', 'actions'];

    constructor(private readonly sistemaService: SistemaService,
                private readonly modalConfirmacaoService: ModalConfirmacaoService,
                private readonly notificacaoService: NotificacaoService) {
        super();
    }

    public ngOnInit(): void {
        this.carregarSistemas();
    }

    private carregarSistemas(): void {
        this.sistemaService.listarTodos().subscribe({
            next: (sistemas: Sistema[]) => this.dadosTabela.data = sistemas,
            error: (error: any) => {
                this.notificacaoService.erro(error.message || MensagemSistema.ERRO);
            }
        });
    }

    public deletarSistema(id: string): void {
        this.modalConfirmacaoService.open({
            title:  'Excluir Sistema',
            message: MensagemSistema.CONFIRMACAO_EXCLUSAO
            }).afterClosed()
              .subscribe((opcao: string) => { 
                    opcao === 'Confirmar' && this.executarDelecao(id);
            });
    }
    
    private executarDelecao(id: string): void {
        this.sistemaService.remover(id).subscribe({
            next: (_) => {
                this.notificacaoService.sucesso();
                this.carregarSistemas();
            },
            error: (error: any) => this.notificacaoService.erro(error.message || MensagemSistema.ERRO)
        });
    }
    
}