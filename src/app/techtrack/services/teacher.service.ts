import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }

  //getTeachers(): Observable<Teacher[]> {
  //  return this.http.get<any[]>(this.apiUrl);
  //}

  getTeachers(): Observable<Teacher[]> {
    return of(this.getMockTeachers());
  }

  getTeacherByName(searchTeacherName?: string): Observable<Teacher[]> {
    debugger;
    let params = new HttpParams();
    if (searchTeacherName) {
      params = params.set('searchStudentName', searchTeacherName);
    }
    return this.http.get<Teacher[]>(`${this.apiUrl}/teacher`, { params });
  }

  //getTeacherById(teacherId: string): Observable<Teacher> {
  //  return this.http.get<Teacher>(`${this.apiUrl}/teacher/${teacherId}`);
  //}
 
  getTeacherById(teacherId: string): Observable<Teacher> {
    const teacher = this.getMockTeachers().find(s => s.teacherId == teacherId);
    return of(teacher);
  }
  addTeacher(teacher: Teacher): Observable<Teacher> {
    debugger;
    return this.http.post<Teacher>(`${this.apiUrl}/teacher`, teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    debugger;
    return this.http.put<Teacher>(`${this.apiUrl}/teacher/${teacher.teacherId}`, teacher);
  }

  deleteTeacher(teacherId: string) {
    debugger;
    return this.http.delete(`/api/subject/${teacherId}`);
  }

  private getMockTeachers(): any[] {
    return [
      {
        teacherId: 1,
        name: 'John Doe',
        age: 35,
        gender: 'Male',
        rollNumber: 'T-101',
        email: 'john.doe@example.com',
        contact: '9876543210',
        subject: 'Mathematics',
        experience: 10,
        qualification: 'M.Sc. Mathematics',
        image: 'assets/images/teacher1.jpg',
        status: 'active'
      },
      {
        teacherId: 2,
        name: 'Jane Smith',
        age: 28,
        gender: 'Female',
        rollNumber: 'T-102',
        email: 'jane.smith@example.com',
        contact: '9876543211',
        subject: 'English',
        experience: 5,
        qualification: 'M.A. English',
        image: 'assets/images/teacher2.jpg',
        status: 'inActive'
      },
      {
        teacherId: 3,
        name: 'Alice Johnson',
        age: 42,
        gender: 'Female',
        rollNumber: 'T-103',
        email: 'alice.johnson@example.com',
        contact: '9876543212',
        subject: 'Physics',
        experience: 15,
        qualification: 'M.Sc. Physics, B.Ed',
        image: 'assets/images/teacher3.jpg',
        status: 'active'
      },
      {
        teacherId: 4,
        name: 'Robert Brown',
        age: 50,
        gender: 'Male',
        rollNumber: 'T-104',
        email: 'robert.brown@example.com',
        contact: '9876543213',
        subject: 'Chemistry',
        experience: 20,
        qualification: 'Ph.D. in Chemistry',
        image: 'assets/images/teacher4.jpg',
        status: 'active'
      },
      {
        teacherId: 5,
        name: 'Emily Davis',
        age: 30,
        gender: 'Female',
        rollNumber: 'T-105',
        email: 'emily.davis@example.com',
        contact: '9876543214',
        subject: 'Biology',
        experience: 7,
        qualification: 'M.Sc. Biology',
        image: 'assets/images/teacher5.jpg',
        status: 'inActive'
      }
    ];
  }


}
