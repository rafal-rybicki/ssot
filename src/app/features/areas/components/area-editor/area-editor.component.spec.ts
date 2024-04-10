import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEditorComponent } from './area-editor.component';

describe('AreaEditorComponent', () => {
  let component: AreaEditorComponent;
  let fixture: ComponentFixture<AreaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
