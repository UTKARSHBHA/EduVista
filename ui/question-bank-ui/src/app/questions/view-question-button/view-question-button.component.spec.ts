import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionButtonComponent } from './view-question-button.component';

describe('ViewQuestionButtonComponent', () => {
  let component: ViewQuestionButtonComponent;
  let fixture: ComponentFixture<ViewQuestionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQuestionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQuestionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
