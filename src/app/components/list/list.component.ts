import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';

import { Task } from '../../interfaces/task.interface';
import { TaskDto } from '../../dto/task.dto';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';

import { List } from '../../interfaces/list.interface';
import { ListDto } from '../../dto/list.dto';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TaskComponent, NgStyle, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  editListForm: FormGroup;
  newTaskForm: FormGroup;
  isEditingList: boolean = false;
  isCreatingNewTask: boolean = false;

  formBuilder = inject(FormBuilder);
  listService = inject(ListService);
  taskService = inject(TaskService);

  constructor() {
    this.editListForm = this.formBuilder.group({
      listTitle: ['', [Validators.required]],
      listColor: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]]
    });

    this.newTaskForm = this.formBuilder.group({
      taskTitle: ['', [Validators.required]],
      taskDescription: [''],
      taskDueDate: [''],
    });
  }

  tasksArraySignal: WritableSignal<Task[]> = signal([]);

  @Input()
  listItem!: List;

  @Output()
  listDeleted = new EventEmitter<string>();

  toggleEditingList() {
    this.isEditingList = !this.isEditingList;
  }

  toggleCreatingTask() {
    this.isCreatingNewTask = !this.isCreatingNewTask;
  }

  canSubmitEditTistForm() {
    return this.editListForm.value.listTitle === '';
  }

  canSubmitNewTaskForm() {
    return this.newTaskForm.value.taskTitle === '';
  }

  submitUpdatedList() {
    if (this.editListForm.valid) {
      const list: ListDto = {
        title: this.editListForm.value.listTitle,
        color: this.editListForm.value.listColor.substring(1)
      }

      this.isEditingList = false;

      this.listService.updateList(list, this.listItem._id).subscribe((returned) => {
        this.listItem = returned;
      });
    }
  }

  submitNewTask() {
    if (this.newTaskForm.valid) {

      const task: TaskDto = {
        title: this.newTaskForm.value.taskTitle,
        description: this.newTaskForm.value.taskDescription,
        dueDate: this.newTaskForm.value.taskDueDate,
        completed: false,
        list: this.listItem._id
      };

      this.isCreatingNewTask = false;

      this.taskService.createTask(task).subscribe((task: Task) => {
        this.tasksArraySignal.set([...this.tasksArraySignal(), task]);

        this.newTaskForm.reset();
      });
    }
  }

  deleteList() {
    this.listService.deleteList(this.listItem._id).subscribe((returned) => {
      this.listDeleted.emit(returned._id);
    });
  }

  removeTask(id: string) {
    this.tasksArraySignal.set(this.tasksArraySignal().filter(task => task._id !== id));
  }


  ngOnInit() {
    this.taskService.getTasks(this.listItem._id).subscribe((tasks: Task[]) => {
      this.tasksArraySignal.set(tasks);
    });

    this.editListForm.setValue({ listTitle: this.listItem.title, listColor: `#${this.listItem.color}` });
  }

  ngOnDestroy() {
    // will have to deal with tasks here
  }
}
