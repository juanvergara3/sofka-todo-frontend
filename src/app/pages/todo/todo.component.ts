import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ListComponent } from '../../components/list/list.component';
import { ListService } from '../../services/list.service';
import { List } from '../../interfaces/list.interface';
import { ListDto } from '../../dto/list.dto';

import { NameService } from '../../services/name.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ListComponent, ReactiveFormsModule, NgStyle],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class ToDoComponent {

  newListForm: FormGroup;
  isCreatingNewList: boolean = false;

  formBuilder = inject(FormBuilder);
  listService = inject(ListService);
  nameService = inject(NameService);

  constructor() {
    this.newListForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(45)]],
      color: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]]
    });
  }

  listsArraySignal: WritableSignal<List[]> = signal([]);

  toggleCreatingList() {
    this.isCreatingNewList = !this.isCreatingNewList;

    this.resetForm();
  }

  canSubmit() {
    return !this.newListForm.valid;
  }

  submitNewList() {
    if (this.newListForm.valid) {
      const list: ListDto = {
        title: this.newListForm.value.title,
        color: this.newListForm.value.color.substring(1)
      };

      this.isCreatingNewList = false;

      this.listService.createList(list).subscribe((list: List) => {
        this.listsArraySignal.set([...this.listsArraySignal(), list]);

        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newListForm.setValue({ title: '', color: `#000000` });
  }

  removeList(id: string) {
    this.listsArraySignal.set(this.listsArraySignal().filter(list => list._id !== id));
  }

  ngOnInit() {
    this.listService.getLists().subscribe((lists: List[]) => {
      this.listsArraySignal.set(lists);
    });

    this.nameService.updateName();

    this.resetForm();
  }
}
