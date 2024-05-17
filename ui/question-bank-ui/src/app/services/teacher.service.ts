import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) { }

  registerTeacher(teacherData: any) :  Observable<any> {
    return this.http.post('http://localhost:8000/api/teachers/', teacherData); // Replace with actual URL
  }

  getTeachers(): Observable<any> {
    return this.http.get('http://localhost:8000/api/teachers/');
  }
  getTeacherById(id: number): Observable<any> {
    return this.http.get(`${'http://localhost:8000/api/teachers/'}${id}`);
 }
 deleteTeacher(teacherId: number): Observable<any> {
  return this.http.delete(`${'http://localhost:8000/api/teachers/'}${teacherId}`);
}

updateTeacher(teacherId: number, teacherData: FormData): Observable<any> {
  return this.http.put(`${'http://localhost:8000/api/teachers/'}${teacherId}/`, teacherData);
}
}
