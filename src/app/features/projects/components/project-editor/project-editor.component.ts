import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProject } from '../../store/projects.actions';
import { View } from '../../models/view.model';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-project-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss'
})
export class ProjectEditorComponent {
  @Input() currentColor: string = 'black';
  @Input() currentName: string = '';
  @Input() currentView: string = 'list';

  public projectForm = new FormGroup({
    color: new FormControl(this.currentColor, [Validators.required]),
    name: new FormControl(this.currentName, [Validators.required]),
    view: new FormControl(this.currentView, [Validators.required])
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.projectForm.patchValue({
      color: this.currentColor,
      name: this.currentName,
      view: this.currentView
    });
  }

  onClose() {
    this.closeEditor();
  }

  onSubmit() {
    const id = uuid();
    const project = {
      color: this.projectForm.value.color!,
      id,
      isActive: true,
      name: this.projectForm.value.name!,
      order: 0,
      ownerId: '1',
      sections: [
       {
        name: 'default',
        id: uuid(),
        isOpen: true,
        order: 1,
        projectId: id
       }
      ],
      view: View.List,
    }

    this.store.dispatch(addProject({ project }))

    this.projectForm.patchValue({
      color: 'black',
      name: '',
      view: 'list'
    });

    this.closeEditor();
    this.router.navigate(['project', id])
  }

  private closeEditor() {
    const editor = document.querySelector('app-project-editor') as HTMLElement;
    editor.style.display = 'none'
  }
}