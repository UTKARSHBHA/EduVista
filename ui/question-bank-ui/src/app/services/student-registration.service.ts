import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {
  constructor(private http: HttpClient) { }

  registerStudent(studentData: any) :  Observable<any> {
    return this.http.post('http://localhost:8000/api/students/', studentData); // Replace with actual URL
  }

  getStudents(): Observable<any> {
    return this.http.get('http://localhost:8000/api/students/');
  }
}
