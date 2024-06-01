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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      middle_name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required], // Added gender field with required validator
      parents_name: ['' ,Validators.required],
      parents_phone_number: ['' ,Validators.required],
    
      // Education
      highest_qualification: ['',Validators.required],
      educational_institution: ['',Validators.required],
      year_of_completion: ['',Validators.required],
    
      // Test-related information
      entrance_test_applied_for: ['',Validators.required],
    
      // Additional details
      address: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      postal_code: ['', Validators.required], // Added postal_code field with required validator
      country: ['',Validators.required],
    });
    this.route.params.subscribe(params => {
      const entranceTestId = params['entranceTestId'];
      // Assuming you have a FormGroup instance named candidateForm
      this.candidateForm.controls['entrance_test_applied_for'].setValue(entranceTestId);
      console.log(this.candidateForm);
    });
  }
  
  ngOnInit(): void {
    

  }

  onSubmit() {
    console.log(this.candidateForm.valid);
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
