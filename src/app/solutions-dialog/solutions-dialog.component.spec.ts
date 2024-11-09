import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { SolutionsDialogComponent } from './solutions-dialog.component';
import { of, throwError } from 'rxjs';

class MockMatDialogRef {
  close(): void {}
}

describe('SolutionsDialogComponent', () => {
  let component: SolutionsDialogComponent;
  let fixture: ComponentFixture<SolutionsDialogComponent>;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      declarations: [SolutionsDialogComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: HttpClient, useValue: httpClientSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionsDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch card contents on init', () => {
    const mockData = [
      { text: 'Test text 1' },
      { text: 'Test text 2' },
    ];

    httpClientSpy.get.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.cardContents).toEqual(mockData);
  });

  it('should handle error and fall back to lorem ipsum text', () => {
    httpClientSpy.get.and.returnValue(throwError('error'));

    component.ngOnInit();

    const expectedFallbackData = [
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    ];

    expect(component.cardContents).toEqual(expectedFallbackData);
  });
});
