import { NgClass, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Modal } from 'app/shared/models/model/modal.model';

@Component({
    selector     : 'app-modal-confirmacao',
    templateUrl  : './modal-confirmacao.component.html',
    styleUrls    : ['./modal-confirmacao.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass],
})
export class ModalConfirmacaoComponent
{
    constructor(@Inject(MAT_DIALOG_DATA) public modal: Modal){}

}