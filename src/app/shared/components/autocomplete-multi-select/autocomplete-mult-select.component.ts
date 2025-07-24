import { CommonModule } from '@angular/common';
import { 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  forwardRef,
  OnDestroy
} from '@angular/core';
import { 
  FormControl, 
  ReactiveFormsModule, 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client } from 'app/model/client/client.model';
import { ClientService } from 'app/services/clients/clients.service';
import { NotificacaoService } from 'app/shared/services/notificacao.service';
import { MensagemSistema } from 'app/shared/models/enum/mensagem-sistema.enum';

@Component({
  selector: 'app-autocomplete-mult-select',
  templateUrl: './autocomplete-mult-select.component.html',
  styleUrls: ['./autocomplete-mult-select.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteMultiSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteMultiSelectComponent),
      multi: true
    }
  ]
})
export class AutocompleteMultiSelectComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() ariaLabel: string = '';
  @Input() emptyMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';

  @Output() clientsChanged = new EventEmitter<Client[]>();

  public clients: Client[] = [];
  public selectedClients: Client[] = [];
  public clientCtrl = new FormControl('');
  public filteredClients: Observable<Client[]>;
  public hasError: boolean = false;

  private readonly destroy$ = new Subject<void>();
  private onChange = (value: Client[]) => {};
  private onTouched = () => {};

  constructor(
    private readonly clientService: ClientService,
    private readonly notificacaoService: NotificacaoService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.setupFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: Client[]): void {
    if (value && Array.isArray(value)) {
      this.selectedClients = [...value];
    } else {
      this.selectedClients = [];
    }
  }

  registerOnChange(fn: (value: Client[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.clientCtrl.disable();
    } else {
      this.clientCtrl.enable();
    }
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && this.selectedClients.length === 0) {
      this.hasError = true;
      return { required: true };
    }
    this.hasError = false;
    return null;
  }

  private setupFilter(): void {
    this.filteredClients = this.clientCtrl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => {
        const searchValue = value ? String(value).trim() : '';
        if (!searchValue || searchValue === '') {
          return this.getAvailableClients();
        }
        return this.filterClients(searchValue);
      }),
      takeUntil(this.destroy$)
    );
  }

  private loadClients(): void {
    this.clientService.listarTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (clients: Client[]) => {
          this.clients = clients;
        },
        error: (error: any) => {
          this.notificacaoService.erro(error.message || MensagemSistema.ERRO);
        }
      });
  }

  private filterClients(value: string): Client[] {
    const filterValue = value.toLowerCase();
    return this.clients.filter(client => 
      client.name?.toLowerCase().includes(filterValue)
    );
  }

  private getAvailableClients(): Client[] {
    return this.clients;
  }

  public selectClient(client: Client): void {
    if (this.disabled) return;

    const isSelected = this.isClientSelected(client);
    
    if (isSelected) {
      this.removeClient(client);
    } else {
      this.selectedClients.push(client);
      this.emitChanges();
    }
    
    this.clientCtrl.setValue('');
    this.onTouched();
  }

  public removeClient(client: Client): void {
    if (this.disabled) return;

    const index = this.selectedClients.findIndex(selected => selected.id === client.id);
    if (index >= 0) {
      this.selectedClients.splice(index, 1);
      this.emitChanges();
    }
  }

  public onInputFocus(): void {
    if (this.clientCtrl.value !== '') {
      this.clientCtrl.setValue('');
    }
    this.onTouched();
  }

  public isClientSelected(client: Client): boolean {
    return this.selectedClients.some(selected => selected.id === client.id);
  }

  private emitChanges(): void {
    this.onChange(this.selectedClients);
    this.clientsChanged.emit([...this.selectedClients]);
  }
}