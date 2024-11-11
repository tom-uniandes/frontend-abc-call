import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIncidentPublicComponent } from './search-incident-public.component';

describe('SearchIncidentPublicComponent', () => {
  let component: SearchIncidentPublicComponent;
  let fixture: ComponentFixture<SearchIncidentPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchIncidentPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIncidentPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
