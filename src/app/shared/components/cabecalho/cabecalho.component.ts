import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-cabecalho',
    templateUrl: 'cabecalho.component.html',
    imports: [
        CommonModule,
        RouterModule,
    ],
    standalone: true,
})
export class CabecalhoComponent  {

    @Input() public titulo: string = ''

}