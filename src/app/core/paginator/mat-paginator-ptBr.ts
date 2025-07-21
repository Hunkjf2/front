import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntPtBr extends MatPaginatorIntl {

  override itemsPerPageLabel: string = 'Itens por página';
  override nextPageLabel: string    = 'Próxima';
  override previousPageLabel: string = 'Anterior';
  override lastPageLabel: string = 'Última Página';
  override firstPageLabel: string = 'Primeira Página';

  public getRangeLabel = (page: number, pageSize: number, length: number) => {
    return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' de ' + length;
  };

}