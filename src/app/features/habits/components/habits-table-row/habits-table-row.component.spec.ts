import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsTableRowComponent } from './habits-table-row.component';

describe('HabitsTableRowComponent', () => {
  let component: HabitsTableRowComponent;
  let fixture: ComponentFixture<HabitsTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
