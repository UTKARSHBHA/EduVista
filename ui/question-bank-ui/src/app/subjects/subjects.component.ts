import { Component } from '@angular/core';
import { SubjectsService } from '../services/subjects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  subjectForm: FormGroup;
  subjects: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: SubjectsService
 ) {
    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
 }
 ngOnInit(): void {
    this.service.getSubjects().subscribe(data => {
      this.subjects = data;
      console.log(this.subjects);
    });
 }

 onSubmit(): void {
  if (this.subjectForm.valid) {
    this.service.createSubject(this.subjectForm.value).subscribe(data => {
      console.log('Subject created:', data);
      this.subjects.push(data);
      this.subjectForm.reset();
    });
  }
}
}
