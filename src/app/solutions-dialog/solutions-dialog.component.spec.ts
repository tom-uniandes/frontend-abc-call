import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionsDialogComponent } from './solutions-dialog.component';
import { of, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SolutionsService } from './solutions.service';
import { IncidentsService } from '../incidents/incidents.service';
import { MatIconModule } from '@angular/material/icon';

const dialogDataMock = {
  id: '12345',
  company: 'XYZ Inc.'
};

class MatDialogRefMock {
  close(result?: any): void {
    console.log('Dialog closed with result:', result);
  }
}

describe('SolutionsDialogComponent', () => {
  let component: SolutionsDialogComponent;
  let fixture: ComponentFixture<SolutionsDialogComponent>;
  let solutionsServiceSpy: jasmine.SpyObj<SolutionsService>;

  beforeEach(waitForAsync(() => {
    solutionsServiceSpy = jasmine.createSpyObj('SolutionsService', ['getCardContents']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        SolutionsDialogComponent
      ],
      providers: [
        SolutionsService,
        IncidentsService,
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },  // Cambiado a MAT_DIALOG_DATA
        ToastrService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch card contents on init', () => {
    const mockData = [
      { text: 'Test text 1' },
      { text: 'Test text 2' },
    ];

    solutionsServiceSpy.getCardContents.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.cardContents.length).toEqual([].length);
  });

  it('should handle error and fall back to lorem ipsum text', () => {
    solutionsServiceSpy.getCardContents.and.returnValue(throwError('error'));

    component.ngOnInit();

    const expectedFallbackData = [
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    ];

    expect(component.cardContents).toEqual(expectedFallbackData);
  });
});
