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
import { Observable, Subject, takeUntil, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface AutocompleteConfig<T> {
  displayProperty: keyof T;
  valueProperty: keyof T;
  searchProperties: (keyof T)[];
}

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
export class AutocompleteMultiSelectComponent<T = any> implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputPlaceholder: string = '';
  @Input() ariaLabel: string = '';
  @Input() emptyMessage: string = 'Nenhum item encontrado';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  
  @Input() items: T[] = [];
  @Input() config: AutocompleteConfig<T> = {
    displayProperty: 'name' as keyof T,
    valueProperty: 'id' as keyof T,
    searchProperties: ['name' as keyof T]
  };
  @Input() secondaryDisplayProperty?: keyof T;
  @Output() itemsChanged = new EventEmitter<T[]>();

  public selectedItems: T[] = [];
  public itemCtrl = new FormControl('');
  public filteredItems: Observable<T[]>;
  public hasError: boolean = false;

  private readonly destroy$ = new Subject<void>();
  private onChange = (value: T[]) => {};
  private onTouched = () => {};

  constructor() {}

  ngOnInit(): void {
    this.setupFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: T[]): void {
    if (value && Array.isArray(value)) {
      this.selectedItems = [...value];
    } else {
      this.selectedItems = [];
    }
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.itemCtrl.disable();
    } else {
      this.itemCtrl.enable();
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && this.selectedItems.length === 0) {
      this.hasError = true;
      return { required: true };
    }
    this.hasError = false;
    return null;
  }

  private setupFilter(): void {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => {
        const searchValue = value ? String(value).trim() : '';
        if (!searchValue || searchValue === '') {
          return this.getAvailableItems();
        }
        return this.filterItems(searchValue);
      }),
      takeUntil(this.destroy$)
    );
  }

  private filterItems(value: string): T[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => 
      this.config.searchProperties.some(prop => {
        const propValue = item[prop];
        return propValue && String(propValue).toLowerCase().includes(filterValue);
      })
    );
  }

  private getAvailableItems(): T[] {
    return this.items;
  }

  public selectItem(item: T): void {
    if (this.disabled) return;

    const isSelected = this.isItemSelected(item);
    
    if (isSelected) {
      this.removeItem(item);
    } else {
      this.selectedItems.push(item);
      this.emitChanges();
    }
    
    this.itemCtrl.setValue('');
    this.onTouched();
  }

  public removeItem(item: T): void {
    if (this.disabled) return;

    const index = this.selectedItems.findIndex(selected => 
      selected[this.config.valueProperty] === item[this.config.valueProperty]
    );
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.emitChanges();
    }
  }

  public onInputFocus(): void {
    if (this.itemCtrl.value !== '') {
      this.itemCtrl.setValue('');
    }
    this.onTouched();
  }

  public isItemSelected(item: T): boolean {
    return this.selectedItems.some(selected => 
      selected[this.config.valueProperty] === item[this.config.valueProperty]
    );
  }

  public getDisplayValue(item: T): string {
    return String(item[this.config.displayProperty] || '');
  }

  public getSecondaryDisplayValue(item: T): string {
    if (!this.secondaryDisplayProperty) return '';
    return String(item[this.secondaryDisplayProperty] || '');
  }

  private emitChanges(): void {
    this.onChange(this.selectedItems);
    this.itemsChanged.emit([...this.selectedItems]);
  }
}