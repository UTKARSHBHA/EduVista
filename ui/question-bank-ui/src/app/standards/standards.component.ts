import { Component, Optional } from '@angular/core';
import { StandardsService } from '../services/standards.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { SubjectsService } from '../services/subjects.service';
import { NgSelectModule } from '@ng-select/ng-select'; 

@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [ReactiveFormsModule ,MatDialogModule, NgSelectModule
  ],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.css',
})
export class StandardsComponent {
  standardsForm: FormGroup;
  subjects: any[] = [];

 constructor(
    private formBuilder: FormBuilder,
    private standardsService: StandardsService,
    private subjectsService: SubjectsService,
    @Optional() public dialogRef: MatDialogRef<StandardsComponent>
 ) {
    this.standardsForm = this.formBuilder.group({
      name: ['', Validators.required],
      subjects: [[]],
    });
 }

 ngOnInit(): void {
    this.loadSubjects();
 }

 loadSubjects(): void {
    this.subjectsService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
 }

 onSubmit(): void {
  if (this.standardsForm.valid) { 
    const formValue = this.standardsForm.value;
    
    this.standardsService.addStandard(formValue).subscribe(
      (response) => {
        console.log('Standard added:', response);
        this.standardsForm.reset(); // Reset the form
        this.dialogRef?.close({ refresh: true})
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  } else {
    console.error('Form is invalid');
  }
}
}