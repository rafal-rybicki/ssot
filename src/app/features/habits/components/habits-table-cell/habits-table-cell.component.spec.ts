import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsTableCellComponent } from './habits-table-cell.component';

describe('HabitsTableCellComponent', () => {
  let component: HabitsTableCellComponent;
  let fixture: ComponentFixture<HabitsTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitsTableCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitsTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
