import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { Modal } from '../models/model/modal.model';
import { ModalConfirmacaoComponent } from '../components/modal-confirmacao/modal-confirmacao.component';

@Injectable({providedIn: 'root'})
export class ModalConfirmacaoService
{
    private matDialog: MatDialog = inject(MatDialog);
    private configuracaoPadrao: Modal = {
        title      : 'Confirmar Ação',
        message    : 'Você tem certeza que deseja confirmar esta ação?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirmar',
                color: 'warn',
            },
            cancel : {
                show : true,
                label: 'Cancelar',
            },
        },
        dismissible: true,
    };

    public open(configuracaoPersonalizada: Modal = {}): MatDialogRef<ModalConfirmacaoComponent>
    {
        let configuracaoFinal = merge({}, this.configuracaoPadrao, configuracaoPersonalizada);

        return this.matDialog.open(ModalConfirmacaoComponent, {
            autoFocus   : false,
            disableClose: !configuracaoFinal.dismissible,
            data        : configuracaoFinal,
            panelClass  : 'fuse-confirmation-dialog-panel',
        });
    }
}
