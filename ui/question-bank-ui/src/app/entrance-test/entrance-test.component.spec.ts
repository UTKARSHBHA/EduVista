import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceTestComponent } from './entrance-test.component';

describe('EntranceTestComponent', () => {
  let component: EntranceTestComponent;
  let fixture: ComponentFixture<EntranceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntranceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
