import { TestBed } from '@angular/core/testing';

import { SolutionsService } from './solutions.service';
import { HttpClientModule } from '@angular/common/http';

describe('SolutionsService', () => {
  let service: SolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    service = TestBed.inject(SolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
