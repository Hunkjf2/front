import { FormGroup } from "@angular/forms";

export function carregarDados(formulario: FormGroup, entidade: any): void {
  formulario.patchValue(entidade);
}