import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Optional } from 'ag-grid-community';
import { TagsService } from '../services/tags.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tagForm: FormGroup;
  tags: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    @Optional() public dialogRef: MatDialogRef<any>

 ) {
    this.tagForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
 }
 ngOnInit(): void {
    // this.loadTags();
 }

 onSubmit(): void {
  console.log('clicked');
  if (this.tagForm.valid) {
    console.log("in valid");
    this.tagsService.createTag(this.tagForm.value).subscribe(data => {
      console.log('Tag created:', data);
      this.tags.push(data);
      this.tagForm.reset();
      this.dialogRef?.close({ refresh: true})
    });
  }
}
loadTags(): void {
  this.tagsService.getTags().subscribe(data => {
    this.tags = data;
  });
}

deleteTag(tagId: number): void {
  if (confirm('Are you sure you want to delete this tag?')) {
      this.tagsService.deleteTag(tagId).subscribe({
          next: response => {
              console.log(response);
              // Reload the tags list to ensure it's up-to-date
              this.loadTags();
          },
          error: error => {
              console.error(error);
          }
      });
  }
}

}
