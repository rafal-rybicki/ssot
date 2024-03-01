import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addArea } from '../../store/areas/areas.actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-area-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './area-editor.component.html',
  styleUrl: './area-editor.component.scss'
})
export class AreaEditorComponent {
  @Input() currentName: string = '';

  public areaForm = new FormGroup({
    name: new FormControl(this.currentName, [Validators.required]),
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.areaForm.patchValue({
      name: this.currentName
    });
  }

  onClose() {
    this.closeEditor();
  }

  onSubmit() {
    const area = {
      id: uuid(),
      isOpen: true,
      name: this.areaForm.value.name!,
      order: 0,
      ownerId: '1'
    }

    this.store.dispatch(addArea({ area }))

    this.areaForm.patchValue({
      name: ''
    });

    this.closeEditor();
  }


  private closeEditor() {
    const editor = document.querySelector('app-area-editor') as HTMLElement;
    editor.style.display = 'none'
  }
}
