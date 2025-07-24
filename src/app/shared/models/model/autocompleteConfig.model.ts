export interface AutocompleteConfig<T> {
  displayProperty: keyof T;
  valueProperty: keyof T;
  searchProperties: (keyof T)[];
}