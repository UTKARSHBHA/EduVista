import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {
  constructor(private http: HttpClient) { }

  registerStudent(studentData: any) {
    return this.http.post('http://localhost:8000/api/students/', studentData); // Replace with actual URL
  }
}
