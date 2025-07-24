import { CommonModule } from '@angular/common';
import { 
  Component, 
  EventEmitter, 
  Input, 
  OnInit, 
  Output, 
  forwardRef,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { 
  FormControl, 
  ReactiveFormsModule, 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidationErrors
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, takeUntil, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutocompleteConfig } from 'app/shared/models/model/autocompleteConfig.model';

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
export class AutocompleteMultiSelectComponent<T = any> implements OnInit, OnDestroy, OnChanges, ControlValueAccessor, Validator {

  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public inputPlaceholder: string = '';
  @Input() public ariaLabel: string = '';
  @Input() public emptyMessage: string = 'Nenhum item encontrado';
  @Input() public disabled: boolean = false;
  @Input() public required: boolean = false;
  @Input() public errorMessage: string = '';
  @Input() public items: T[] = [];
  @Input() public config: AutocompleteConfig<T> = {
    displayProperty: 'name' as keyof T,
    valueProperty: 'id' as keyof T,
    searchProperties: ['name' as keyof T]
  };
  @Input() public secondaryDisplayProperty?: keyof T;
  @Output() public itemsChanged = new EventEmitter<T[]>();

  public readonly itemCtrl = new FormControl('');
  public readonly filteredItems: Observable<T[]>;
  protected selectedItems: T[] = [];
  protected hasError: boolean = false;

  private readonly destroy$ = new Subject<void>();
  private onChange = (value: T[]) => {};
  private onTouched = () => {};

  constructor() {
    this.filteredItems = this.setupFilter();
  }

  public ngOnInit(): void {
    this.itemCtrl.setValue('');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && !changes['items'].firstChange) {
      this.refreshFilter();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public writeValue(value: T[]): void {
    if (value && Array.isArray(value)) {
      this.selectedItems = [...value];
    } else {
      this.selectedItems = [];
    }
  }

  public registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.itemCtrl.disable();
    } else {
      this.itemCtrl.enable();
    }
  }

  public validate(): ValidationErrors | null {
    if (this.required && this.selectedItems.length === 0) {
      this.hasError = true;
      return { required: true };
    }
    this.hasError = false;
    return null;
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

    const index = this.findItemIndex(item);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
      this.emitChanges();
    }
  }

  public onInputFocus(): void {
    this.itemCtrl.setValue('');
    this.onTouched();
  }

  public onInputClick(): void {
    if (!this.disabled) {
      this.itemCtrl.setValue('');
      this.itemCtrl.updateValueAndValidity();
    }
  }

  public isItemSelected(item: T): boolean {
    return this.findItemIndex(item) >= 0;
  }

  public getDisplayValue(item: T): string {
    const objectValue: any = item[this.config.displayProperty];
    return String(objectValue || '');
  }

  public getSecondaryDisplayValue(item: T): string {
    if (!this.secondaryDisplayProperty) return '';
    const secondaryDisplayProperty: any = item[this.secondaryDisplayProperty];
    return String(secondaryDisplayProperty || '');
  }

  private getItemsBasedOnSearch(searchValue: string): T[] {
    if (!searchValue) {
        return this.getAvailableItems();
    }
    return this.filterItems(searchValue);
  }

  private setupFilter(): Observable<T[]> {
      return this.itemCtrl.valueChanges.pipe(
          startWith(''),
          map((value: string | null) => {
              const searchValue = value ? String(value).trim() : '';
              return this.getItemsBasedOnSearch(searchValue);
          }),
          takeUntil(this.destroy$)
      );
  }

  private filterItems(value: string): T[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => 
      this.config.searchProperties.some(prop => {
        const propValue: any = item[prop];
        return propValue && String(propValue).toLowerCase().includes(filterValue);
      })
    );
  }

  private getAvailableItems(): T[] {
    return this.items;
  }

  private refreshFilter(): void {
    if (this.itemCtrl.value === '' || this.itemCtrl.value === null) {
      this.itemCtrl.setValue('');
      this.itemCtrl.updateValueAndValidity();
    }
  }

  private findItemIndex(item: T): number {
    return this.selectedItems.findIndex(selected => 
      selected[this.config.valueProperty] === item[this.config.valueProperty]
    );
  }

  private emitChanges(): void {
    this.onChange(this.selectedItems);
    this.itemsChanged.emit([...this.selectedItems]);
  }

  public refreshItems(): void {
    this.refreshFilter();
  }

  public get selectedItemsCount(): number {
    return this.selectedItems.length;
  }

  public get isValid(): boolean {
    return !this.hasError;
  }
}