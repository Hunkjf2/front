import { CommonModule } from '@angular/common';
import { 
  AfterViewInit,
  Component, 
  EventEmitter, 
  Output, 
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-filtro',
  templateUrl: 'filtro.component.html',
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule
  ],
  standalone: true,
})
export class FiltroComponent implements AfterViewInit {

  @ViewChild(MatPaginator) protected paginacao!: MatPaginator;
  @ViewChild(MatSort) protected ordenacao!: MatSort;
  @Output() protected filtroAlterado = new EventEmitter<string>();
  protected opcoesTamanhoPagina: number[] = [5, 10, 20];
  protected dadosTabela = new MatTableDataSource<any>([]);

  public ngAfterViewInit(): void {
    this.paginacaoOrdenacao();
  }

  private paginacaoOrdenacao(): void {
    this.dadosTabela.paginator = this.paginacao;
    this.dadosTabela.sort = this.ordenacao;
  }

  public filtro(event: Event): void {
    this.filtroAlterado.emit((event.target as HTMLInputElement).value.trim().toLowerCase());
    this.paginacao?.firstPage();
  }

}