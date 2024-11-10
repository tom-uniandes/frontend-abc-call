import { TestBed } from '@angular/core/testing';

import { AnaliticaService } from './analitica.service';
import { HttpClientModule } from '@angular/common/http';

describe('AnaliticaService', () => {
  let service: AnaliticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientModule
        ],
      });
    service = TestBed.inject(AnaliticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
