import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Sistema } from 'app/model/sistema/sistema.model';
import { CabecalhoComponent } from 'app/shared/components/cabecalho/cabecalho.component';
import { Formulario } from 'app/shared/models/model/formulario.model';
import {MatSelectModule} from '@angular/material/select';
import { ClientService } from 'app/services/clients/clients.service';
import { Client } from 'app/model/client/client.model';
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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
    MatIconModule
  ]
})
export class FormularioSistemaComponent implements OnInit {

  @Input() public formulario: Formulario<Sistema>;
  @Input() public titulo: string;
  @Output() public enviar: EventEmitter<void> = new EventEmitter<void>();
  public clients: Client[] = [];
  public selectedClients: Client[] = [];
  public clientCtrl = new FormControl('');
  public filteredClients: Observable<Client[]>;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private readonly clientService: ClientService,
    private readonly notificacaoService: NotificacaoService
  ) {
  
  }

  ngOnInit(): void {
    this.listarClients();
    this.filtro();
  }

  private filtro(): void {
    this.filteredClients = this.clientCtrl.valueChanges.pipe(
      startWith(null),
      map((client: string | null) => (client ? this._filter(client) : this.getAvailableClients())),
    );
  }

  private listarClients(): void {
    this.clientService.listarTodos().subscribe({
      next: (clientes: Client[]) => {
        this.clients = clientes;
      },
      error: (error: any) => {
        this.notificacaoService.erro(error.message || MensagemSistema.ERRO);
      }
    });
  }

  private _filter(value: string): Client[] {
    const filterValue = value.toLowerCase();
    return this.getAvailableClients().filter(client => 
      client.name && client.name.toLowerCase().includes(filterValue)
    );
  }

  private getAvailableClients(): Client[] {
    return this.clients.filter(client => 
      !this.selectedClients.find(selected => selected.id === client.id)
    );
  }

  public selectClient(client: Client): void {
    this.selectedClients.push(client);
    this.clientCtrl.setValue('');
  }

  public removeClient(client: Client): void {
    const index = this.selectedClients.indexOf(client);
    if (index >= 0) {
      this.selectedClients.splice(index, 1);
    }
  }
  
}