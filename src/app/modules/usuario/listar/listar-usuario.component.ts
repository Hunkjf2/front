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
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';

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
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorIntPtBr },
    ],
    standalone: true,
})
export class ListarUsuarioComponent implements OnInit {

    public readonly colunas: string[] = ['nome', 'cpf', 'celular', 'telefoneResidencial', 'email', 'actions'];

    constructor() {}

    public ngOnInit(): void {
    }

    
}