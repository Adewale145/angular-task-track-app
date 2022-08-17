import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string | undefined;
  day: string | undefined;
  reminder: boolean = false;
  showAddTask: boolean | undefined;
  subscription: Subscription | undefined;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
   }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text || !this.day) {
      alert('Please add a task');
      return;
    }
   
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
