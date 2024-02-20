import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @HostBinding('class.completed') get class() {
    return this.isCompleted;
  }

  @Input({ required: true }) content!: string;
  @Input({ required: true }) isCompleted!: boolean;
  @Input() allSubtasks: number = 0;
  @Input() completedSubtasks: number = 0;

  changeCompletion() {
    if (!this.isCompleted) {
      if (this.hasSubtasks && !this.allSubtasksAreCompleted) {
        this.completedSubtasks = this.completedSubtasks + 1;
      } 
      
      if (!this.hasSubtasks || this.allSubtasksAreCompleted) {
        this.isCompleted = true;
      }
    } else {
      this.isCompleted = false;
      this.completedSubtasks = 0;
    }
  }

  showDescription() {
    alert('there will be modal with description')
  }

  get hasSubtasks(): boolean {
    return this.allSubtasks > 0;
  }

  private get allSubtasksAreCompleted(): boolean {
    return this.completedSubtasks === this.allSubtasks;
  }
}
