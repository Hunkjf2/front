import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { of } from 'rxjs';

class TestService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected getUrl(): string {
    return '/api/test';
  }
}

describe('BaseService', () => {
  let service: TestService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get', 'post', 'put', 'delete'
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: TestService,
          useFactory: (http: HttpClient) => new TestService(http),
          deps: [HttpClient]
        },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(TestService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('listarTodos', () => {
    it('deve fazer requisição GET para a URL base', () => {
      const expectedData = [{ id: 1, name: 'Test' }];
      httpClientSpy.get.and.returnValue(of(expectedData));

      service.listarTodos().subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/test');
    });
  });

  describe('obterPorId', () => {
    it('deve fazer requisição GET com ID', () => {
      const testId = '123';
      const expectedData = { id: testId, name: 'Test' };
      httpClientSpy.get.and.returnValue(of(expectedData));

      service.obterPorId(testId).subscribe(data => {
        expect(data).toEqual(expectedData);
      });

      expect(httpClientSpy.get).toHaveBeenCalledWith(`/api/test/${testId}`);
    });
  });

  describe('cadastrar', () => {
    it('deve fazer requisição POST com a entidade', () => {
      const testEntity = { name: 'New Item' };
      const expectedResponse = { id: 1, ...testEntity };
      httpClientSpy.post.and.returnValue(of(expectedResponse));

      service.cadastrar(testEntity).subscribe(data => {
        expect(data).toEqual(expectedResponse);
      });

      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/test', testEntity);
    });
  });

  describe('atualizar', () => {
    it('deve fazer requisição PUT com entidade e ID', () => {
      const testEntity = { id: '123', name: 'Updated Item' };
      httpClientSpy.put.and.returnValue(of(testEntity));

      service.atualizar(testEntity).subscribe(data => {
        expect(data).toEqual(testEntity);
      });

      expect(httpClientSpy.put).toHaveBeenCalledWith(
        `/api/test/${testEntity.id}`, 
        testEntity
      );
    });
  });

  describe('remover', () => {
    it('deve fazer requisição DELETE com ID', () => {
      const testId = '123';
      httpClientSpy.delete.and.returnValue(of({}));

      service.remover(testId).subscribe();

      expect(httpClientSpy.delete).toHaveBeenCalledWith(`/api/test/${testId}`);
    });
  });
});