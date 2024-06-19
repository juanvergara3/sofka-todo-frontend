import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { List } from '../../interfaces/list.interface';
import { NgStyle } from '@angular/common';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  editListForm: FormGroup;
  isEditingList: boolean = false;

  formBuilder = inject(FormBuilder);
  listService = inject(ListService);

  constructor() {
    this.editListForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      color: ['', [Validators.required, Validators.pattern('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')]]
    });
  }

  @Input()
  listItem!: List;

  @Output()
  listDeleted = new EventEmitter<string>();

  toggleEditingList() {
    this.isEditingList = !this.isEditingList;
  }

  canSubmit() {
    return this.editListForm.value.title === '';
  }

  deleteList() {
    this.listService.deleteList(this.listItem._id).subscribe((returned) => {
      this.listDeleted.emit(returned._id);
    });
  }

  submitUpdatedList() {
    if (this.editListForm.valid) {
      const list = this.editListForm.value;

      this.isEditingList = false;

      this.listService.updateList(list, this.listItem._id).subscribe();

      this.listItem = list;
    }
  }

  ngOnInit() {
    this.editListForm.setValue({ title: this.listItem.title, color: `#${this.listItem.color}` });
  }

  ngOnDestroy() {
    // will have to deal with tasks here
  }
}
