import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceTestListComponent } from './entrance-test-list.component';

describe('EntranceTestListComponent', () => {
  let component: EntranceTestListComponent;
  let fixture: ComponentFixture<EntranceTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceTestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntranceTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
