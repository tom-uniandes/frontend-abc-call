import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
