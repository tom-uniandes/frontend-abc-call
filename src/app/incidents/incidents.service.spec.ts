import { TestBed } from '@angular/core/testing';

import { IncidentsService } from './incidents.service';
import { HttpClientModule } from '@angular/common/http';

describe('IncidentsService', () => {
  let service: IncidentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(IncidentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
