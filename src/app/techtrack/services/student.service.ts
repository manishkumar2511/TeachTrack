import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  private apiUrl = '';

  //getStudents(): Observable<Student[]> {
  //  return this.http.get<Student[]>(this.apiUrl);
  //}
  getStudentsByName(searchStudentName?: string): Observable<Student[]> {
    debugger;
    let params = new HttpParams();
    if (searchStudentName) {
      params = params.set('searchStudentName', searchStudentName);
    }
    return this.http.get<Student[]>(`${this.apiUrl}/students`, { params });
  }

  getStudents(): Observable<Student[]> {
    return of(this.getMockStudents()); 
  }

  //getStudentById(studentId: string): Observable<Student> {
  //  return this.http.get<Student>(`${this.apiUrl}/students/${studentId}`);
  //}
  getStudentById(studentId: string): Observable<Student> {
    const student = this.getMockStudents().find(s => s.studentId == studentId);
    return of(student); 
  }

  addStudent(student: Student): Observable<Student> {
    debugger;
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  updateStudent(student: Student): Observable<Student> {
    debugger;
    return this.http.put<Student>(`${this.apiUrl}/students/${student.studentId}`, student);
  }
  deleteStudent(studentId: string) {
    debugger;
    return this.http.delete(`/api/students/${studentId}`);
  }



  private getMockStudents(): any[] {
    return [
      {
        studentId: '1', image: 'https://via.placeholder.com/50', name: 'John Doe',
        class: '10th Grade', rollNumber: '12345', age: 16, email: 'john.doe@example.com',
        contact: 9876543210, gender: 'Male', status: 'completed' 
      },
      {
        studentId: '2', image: 'https://via.placeholder.com/50', name: 'Jane Smith',
        class: '9th Grade', rollNumber: '67890', age: 15, email: 'jane.smith@example.com',
        contact: 9876543211, gender: 'Female', status: 'ongoing' 
      },
      {
        studentId: '3', image: 'https://via.placeholder.com/50', name: 'Alice Johnson',
        class: '8th Grade', rollNumber: '54321', age: 14, email: 'alice.johnson@example.com',
        contact: 9876543212, gender: 'Female', status: 'suspended' 
      },
      {
        studentId: '4', image: 'https://via.placeholder.com/50', name: 'Bob Brown',
        class: '12th Grade', rollNumber: '98765', age: 17, email: 'bob.brown@example.com',
        contact: 9876543213, gender: 'Male', status: 'ongoing' 
      }
    ];
  }


}
