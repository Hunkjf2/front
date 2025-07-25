import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Sistema } from 'app/model/sistema/sistema.model';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';
import { Formulario } from 'app/shared/models/model/formulario.model';
import { MatSelectModule } from '@angular/material/select';
import { ClientService } from 'app/services/clients/clients.service';
import { Client } from 'app/model/client/client.model';
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteMultiSelectComponent } from 'app/shared/components/autocomplete-multi-select/autocomplete-mult-select.component';
import { AutocompleteConfig } from 'app/shared/models/model/autocompleteConfig.model';

@Component({
  selector: 'app-formulario-sistema',
  templateUrl: './formulario-sistema.component.html',
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
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    AutocompleteMultiSelectComponent
  ]
})
export class FormularioSistemaComponent implements OnInit {
  @Input() public formulario: Formulario<Sistema>;
  @Input() public titulo: string;
  @Output() public enviar: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild(AutocompleteMultiSelectComponent) autocompleteComponent: AutocompleteMultiSelectComponent<Client>;
  
  public clients: Client[] = [];
  public clientConfig: AutocompleteConfig<Client> = {
    displayProperty: 'name',
    valueProperty: 'id',
    searchProperties: ['name']
  };

  constructor(
    private readonly clientService: ClientService,
    private readonly notificacaoService: NotificacaoService
  ) {}
  
  public ngOnInit(): void {
    this.listarClients();
  }

  public onSubmit(): void {
    this.enviar.emit();
  }

  private listarClients(): void {
    this.clientService.listarTodos().subscribe({
      next: (clientes: Client[]) => {
        this.clients = clientes;
        this.reiniciarAutocomplete();
      },
      error: (error: any) => {
        this.notificacaoService.erro(error.message || MensagemSistema.ERRO);
      }
    });
  }

  private reiniciarAutocomplete(): void {
     this.autocompleteComponent?.refreshItems();
  }

}