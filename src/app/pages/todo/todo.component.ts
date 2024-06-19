import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListComponent } from '../../components/list/list.component';
import { ListService } from '../../services/list.service';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ListComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class ToDoComponent {

  newListForm: FormGroup;
  isCreatingNewList: boolean = false;

  formBuilder = inject(FormBuilder);
  listService = inject(ListService);

  constructor() {
    this.newListForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]]
    });
  }

  listsArraySignal: WritableSignal<List[]> = signal([]);

  toggleCreatingList() {
    this.isCreatingNewList = !this.isCreatingNewList;
  }

  canSubmit() {
    return this.newListForm.value.title === '';
  }

  submitNewList() {
    if (this.newListForm.valid) {
      const list = this.newListForm.value;

      this.isCreatingNewList = false;

      this.listService.createList(list).subscribe((list: List) => {
        this.listsArraySignal.set([...this.listsArraySignal(), list]);

        this.newListForm.reset();
      });
    }
  }

  removeList(id: string) {
    this.listsArraySignal.set(this.listsArraySignal().filter(list => list._id !== id));
  }

  ngOnInit() {
    this.listService.getLists().subscribe((lists: List[]) => {
      this.listsArraySignal.set(lists);
    });
  }
}
