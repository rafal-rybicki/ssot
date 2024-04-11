import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaNewComponent } from './area-new.component';

describe('AreaNewComponent', () => {
  let component: AreaNewComponent;
  let fixture: ComponentFixture<AreaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
