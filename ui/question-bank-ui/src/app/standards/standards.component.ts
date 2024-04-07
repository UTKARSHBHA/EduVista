import { Component } from '@angular/core';
import { StandardsService } from '../services/standards.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-standards',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './standards.component.html',
  styleUrl: './standards.component.css'
})
export class StandardsComponent {
  standards: any = [];
  standardForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private service: StandardsService) { 
    this.standardForm = this.formBuilder.group({
      name: ['', Validators.required]
   });

  }

 ngOnInit(): void {
    this.service.getStandards().subscribe(data => {
      this.standards = data;
      console.log(this.standards);
    });

    this.standardForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.loadStandards();
 }
 loadStandards(): void {
  this.service.getStandards().subscribe(data => {
    this.standards = data;
  });
}
onSubmit(): void {
  if (this.standardForm.valid) {
    this.service.addStandard(this.standardForm.value).subscribe(data => {
      console.log('Standard added:', data);
      this.standards.push(data);
      this.standardForm.reset();
    });
  }
}
}
