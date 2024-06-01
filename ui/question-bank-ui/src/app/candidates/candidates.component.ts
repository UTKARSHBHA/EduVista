import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CandidatesService } from '../services/candidates.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css',
})
export class CandidatesComponent implements OnInit {
  candidateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
  ) {
    this.candidateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      parents_name: [''],
      parents_phone_number: [''],
      highest_qualification: [''],
      educational_institution: [''],
      year_of_completion: [''],
      entrance_test_applied_for: [''],
      address: [''],
      city: [''],
      state: [''],
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const entranceTestId = params['entranceTestId'];
      // Assuming you have a FormGroup instance named candidateForm
      this.candidateForm.controls['entrance_test_applied_for'].setValue(entranceTestId);
      console.log(this.candidateForm);
    });

  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const candidateData = this.candidateForm.value;
      // Call your service to create the entrance test
      this.candidatesService.createCandidate(candidateData).subscribe(
        () => {
          // Handle success
          this.candidateForm.reset(); // Reset the form
        },
        (error) => {
          // Handle error
        }
      );
    }
  }
}
