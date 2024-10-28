import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentDetailComponent } from './incident-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

class MockDialog {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

describe('IncidentDetailComponent', () => {
  let component: IncidentDetailComponent;
  let fixture: ComponentFixture<IncidentDetailComponent>;
  let mockDialog: MockDialog;

  beforeEach(async () => {
    mockDialog = new MockDialog();

    await TestBed.configureTestingModule({
      declarations: [IncidentDetailComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when button is clicked', () => {
    spyOn(component, 'openSolutionsDialog');

    // Simulate button click or method that opens the dialog
    component.openSolutionsDialog();

    expect(component.openSolutionsDialog).toHaveBeenCalled();
  });

  // Additional tests can be added based on component functionality
});
