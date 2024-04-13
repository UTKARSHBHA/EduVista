import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperGeneratorComponent } from './question-paper-generator.component';

describe('QuestionPaperGeneratorComponent', () => {
  let component: QuestionPaperGeneratorComponent;
  let fixture: ComponentFixture<QuestionPaperGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionPaperGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionPaperGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
