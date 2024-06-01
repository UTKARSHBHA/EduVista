import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntranceTestService } from '../services/entrance-test.service';
import { CommonModule } from '@angular/common';
import { SubjectsService } from '../services/subjects.service';
import { StandardsService } from '../services/standards.service';

interface Standard {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

@Component({
  selector: 'app-entrance-test',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './entrance-test.component.html',
  styleUrl: './entrance-test.component.css',
})
export class EntranceTestComponent implements OnInit {
  entranceTestForm: FormGroup;
  standards: Standard[] = [];
  subjects: Subject[] = [];
  examTypes: string[] = ['descriptive', 'objective', 'both']; // Assuming you have these values

  constructor(
    private formBuilder: FormBuilder,
    private entranceTestService: EntranceTestService,
    private subjectService: SubjectsService,
    private standardService: StandardsService,
  ) {
    this.entranceTestForm = this.formBuilder.group({
      subject: ['', Validators.required],
      standard: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      exam_type: ['', Validators.required],
      registration_fee: ['', Validators.required],
      description: ['', Validators.required],
      location: [''], // Optional, so no validator
    });
  }

  ngOnInit(): void {
    // Fetch standards and subjects from your service
    this.standardService.getStandards().subscribe((standards:any) => {
      this.standards = standards;
    });
    this.subjectService.getSubjects().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  onSubmit() {
    if (this.entranceTestForm.valid) {
      const entranceTestData = this.entranceTestForm.value;
      // Call your service to create the entrance test
      this.entranceTestService.createEntranceTest(entranceTestData).subscribe(
        () => {
          // Handle success
          this.entranceTestForm.reset(); // Reset the form
        },
        (error) => {
          // Handle error
        }
      );
    }
  }
}
