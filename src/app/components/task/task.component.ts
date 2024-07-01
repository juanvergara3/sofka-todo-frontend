import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskDto } from '../../dto/task.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  editTaskForm: FormGroup;
  isEditingTask: boolean = false;

  taskService = inject(TaskService);
  dateService = inject(DateService);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.editTaskForm = this.formBuilder.group({
      taskTitle: ['', [Validators.required, Validators.maxLength(60)]],
      taskDescription: ['', [Validators.maxLength(300)]],
      taskDueDate: [''],
    });
  }

  @Input()
  taskItem!: Task;

  @Input()
  contrastColor!: string;

  @Input()
  backgroundColor!: string;

  dueDateFormated!: string;
  isPastDue!: boolean;

  @Output()
  taskDeleted = new EventEmitter<string>();

  toggleEditingTask() {
    this.isEditingTask = !this.isEditingTask;
  }

  canSubmitEditTaskForm() {
    return !this.editTaskForm.valid;
  }

  submitUpdatedTask() {
    if (this.editTaskForm.valid) {
      const task: TaskDto = {
        title: this.editTaskForm.value.taskTitle,
        description: this.editTaskForm.value.taskDescription,
        dueDate: this.editTaskForm.value.taskDueDate == '' ? null : this.editTaskForm.value.taskDueDate,
        completed: this.taskItem.completed,
        list: this.taskItem.list
      };

      this.isEditingTask = false;

      this.taskService.updateTask(task, this.taskItem._id).subscribe((returned) => {
        this.taskItem = returned;
        this.setDates();
        this.initForm();
      });
    }
  }

  completeTask() {
    this.taskItem.completed = !this.taskItem.completed;

    const { title, description, dueDate, completed, list } = this.taskItem;
    const task: TaskDto = { title, description, dueDate, completed, list };

    this.taskService.updateTask(task, this.taskItem._id).subscribe((returned) => {
      this.taskItem = returned;
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskItem._id).subscribe((returned) => {
      this.taskDeleted.emit(returned._id);
    });
  }

  setDates() {
    if (this.taskItem.dueDate === null) {
      this.dueDateFormated = '';
      this.isPastDue = false;
    }
    else {
      this.dueDateFormated = new Date(this.taskItem.dueDate).toISOString().substring(0, 10);
      this.isPastDue = this.dateService.isPastDue(this.dueDateFormated);
    }
  }

  initForm() {
    this.editTaskForm.setValue({
      taskTitle: this.taskItem.title,
      taskDescription: this.taskItem.description,
      taskDueDate: this.dueDateFormated,
    });
  }

  ngOnInit() {
    this.setDates();

    this.initForm();
  }
}
