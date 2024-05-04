import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPapersListComponent } from './question-papers-list.component';

describe('QuestionPapersListComponent', () => {
  let component: QuestionPapersListComponent;
  let fixture: ComponentFixture<QuestionPapersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPapersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionPapersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
