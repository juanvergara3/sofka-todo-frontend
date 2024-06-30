import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { TaskDto } from '../../dto/task.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  editTaskForm: FormGroup;
  isEditingTask: boolean = false;

  taskService = inject(TaskService);
  formBuilder = inject(FormBuilder);

  constructor() {
    this.editTaskForm = this.formBuilder.group({
      taskTitle: ['', [Validators.required]],
      taskDescription: [''],
      taskDueDate: [''],
    });
  }

  @Input()
  taskItem!: Task;

  @Input()
  contrastColor!: string;

  dueDateFormated: string = '';

  @Output()
  taskDeleted = new EventEmitter<string>();

  toggleEditingTask() {
    this.isEditingTask = !this.isEditingTask;
  }

  canSubmitEditTaskForm() {
    return this.editTaskForm.value.listTitle === '';
  }

  submitUpdatedTask() {
    if (this.editTaskForm.valid) {
      const task: TaskDto = {
        title: this.editTaskForm.value.taskTitle,
        description: this.editTaskForm.value.taskDescription,
        dueDate: this.editTaskForm.value.taskDueDate,
        completed: this.taskItem.completed,
        list: this.taskItem.list
      };

      this.isEditingTask = false;

      this.taskService.updateTask(task, this.taskItem._id).subscribe((returned) => {
        this.taskItem = returned;
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

  ngOnInit() {
    this.dueDateFormated = new Date(this.taskItem.dueDate).toISOString().substring(0, 10);

    this.editTaskForm.setValue({
      taskTitle: this.taskItem.title,
      taskDescription: this.taskItem.description,
      taskDueDate: this.dueDateFormated,
    });
  }
}
