import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProject } from '../../store/projects.actions';
import { View } from '../../models/view.model';
import { Router } from '@angular/router';

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

  public taskForm = new FormGroup({
    color: new FormControl(this.currentColor, [Validators.required]),
    name: new FormControl(this.currentName, [Validators.required]),
    view: new FormControl(this.currentView, [Validators.required])
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.taskForm.patchValue({
      color: this.currentColor,
      name: this.currentName,
      view: this.currentView
    });
  }

  onClose() {
    this.closeEditor();
  }

  onSubmit() {
    const id = Math.random();
    const project = {
      color: this.taskForm.value.color!,
      id,
      isActive: true,
      name: this.taskForm.value.name!,
      order: 0,
      ownerId: 1,
      view: View.List,
    }

    this.store.dispatch(addProject({ project }))

    this.taskForm.patchValue({
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