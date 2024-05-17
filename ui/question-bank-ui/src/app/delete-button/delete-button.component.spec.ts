import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionButtonComponent } from './delete-button.component';

describe('DeleteQuestionButtonComponent', () => {
  let component: DeleteQuestionButtonComponent;
  let fixture: ComponentFixture<DeleteQuestionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteQuestionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteQuestionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
