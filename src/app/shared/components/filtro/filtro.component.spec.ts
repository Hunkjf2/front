import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FiltroComponent } from './filtro.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FiltroComponent', () => {
  let component: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        FiltroComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com valores padrão', () => {
    expect((component as any).opcoesTamanhoPagina).toEqual([5, 10, 20]);
    expect((component as any).dadosTabela).toBeInstanceOf(MatTableDataSource);
  });

  describe('initDataSource()', () => {
    it('deve configurar paginator e sort no dataSource', () => {
      const testData = [{id: 1, name: 'Test'}];
      (component as any).dadosTabela = new MatTableDataSource(testData);
      
      (component as any).paginacaoOrdenacao();
      
      expect((component as any).dadosTabela.paginator).toBe((component as any).paginacao);
      expect((component as any).dadosTabela.sort).toBe((component as any).ordenacao);
    });
  });

  describe('filtro()', () => {
    it('deve lidar com valor de filtro vazio', () => {
      spyOn((component as any).filtroAlterado, 'emit');
      
      const mockEvent = {
        target: { value: '   ' }
      } as unknown as Event;
      
      (component as any).filtro(mockEvent);
      
      expect((component as any).filtroAlterado.emit).toHaveBeenCalledWith('');
    });
  });

  describe('Template', () => {
    it('deve renderizar o campo de input', () => {
      const inputElement = fixture.debugElement.query(By.css('input[matInput]'));
      expect(inputElement).toBeTruthy();
    });
  });
});