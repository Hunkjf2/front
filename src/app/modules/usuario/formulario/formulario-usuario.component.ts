import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Usuario } from 'app/model/usuario/usuario.model';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CabecalhoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask()
  ]
})
export class FormularioUsuarioComponent {

  @Input() public formulario: Formulario<Usuario>;
  @Input() public titulo: string;
  @Output() public enviar: EventEmitter<void> = new EventEmitter<void>();

}