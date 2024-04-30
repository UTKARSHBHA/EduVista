import { Component, Optional } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StandardsComponent } from '../standards/standards.component';
@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjectForm: FormGroup;
  subjects: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private subjectsService: SubjectsService,
    @Optional() public dialogRef: MatDialogRef<StandardsComponent>

 ) {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
 }
 ngOnInit(): void {
    // this.loadSubjects();
 }

 onSubmit(): void {
  console.log('clicked');
  if (this.subjectForm.valid) {
    console.log("in valid");
    this.subjectsService.createSubject(this.subjectForm.value).subscribe(data => {
      console.log('Subject created:', data);
      this.subjects.push(data);
      this.subjectForm.reset();
      this.dialogRef?.close({ refresh: true})
    });
  }
}
loadSubjects(): void {
  this.subjectsService.getSubjects().subscribe(data => {
    this.subjects = data;
  });
}

deleteSubject(subjectId: number): void {
  if (confirm('Are you sure you want to delete this subject?')) {
      this.subjectsService.deleteSubject(subjectId).subscribe({
          next: response => {
              console.log(response);
              // Reload the subjects list to ensure it's up-to-date
              this.loadSubjects();
          },
          error: error => {
              console.error(error);
          }
      });
  }
}

}
