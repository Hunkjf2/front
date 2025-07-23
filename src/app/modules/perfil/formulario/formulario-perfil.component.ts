import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Usuario } from 'app/model/usuario/usuario.model';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-formulario-perfil',
  templateUrl: './formulario-perfil.component.html',
  styleUrls: ['./formulario-perfil.component.scss'],
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
    PickListModule,
    ButtonModule,
    InputTextModule
  ]
})
export class FormularioPerfilComponent {

  @Input() public formulario: Formulario<Usuario>;
  @Input() public titulo: string;
  @Output() public enviar: EventEmitter<void> = new EventEmitter<void>();
  public sourceProducts: any[] = [
      { id: 1, name: 'ROLE_CADASTRAR_PERFIL'},
      { id: 2, name: 'ROLE_EDITAR_PERFIL'},
      { id: 3, name: 'ROLE_ATUALIZAR_PERFIL'}
  ];
  public targetProducts: any[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}


}