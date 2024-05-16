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
  getStudentById(id: number): Observable<any> {
    return this.http.get(`${'http://localhost:8000/api/students/'}${id}`);
 }
 deleteStudent(studentId: number): Observable<any> {
  return this.http.delete(`${'http://localhost:8000/api/students/'}${studentId}`);
}

updateStudent(studentId: number, studentData: FormData): Observable<any> {
  return this.http.put(`${'http://localhost:8000/api/students/'}${studentId}/`, studentData);
}
}
