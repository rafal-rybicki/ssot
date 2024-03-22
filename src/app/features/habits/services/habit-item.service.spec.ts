import { TestBed } from '@angular/core/testing';

import { HabitItemService } from './habit-item.service';

describe('HabitItemService', () => {
  let service: HabitItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
