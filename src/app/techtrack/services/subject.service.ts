import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = '';
  constructor(private http: HttpClient) { }

  //getSubjects(): Observable<Subject[]> {
  //  return this.http.get<Subject[]>(this.apiUrl);
  //}

  getSubjects(): Observable<Subject[]> {
    return of(this.getMockSubjects());
  }
  getSubjectByName(searchSubjectName?: string): Observable<Student[]> {
    debugger;
    let params = new HttpParams();
    if (searchSubjectName) {
      params = params.set('searchSubjectName', searchSubjectName);
    }
    return this.http.get<Student[]>(`${this.apiUrl}/subject`, { params });
  }

  //getStudentById(subjectId: string): Observable<Subject> {
  //  return this.http.get<Subject>(`${this.apiUrl}/subject/${subjectId}`);
  //}

  getSubjectById(subjectId: string): Observable<Subject> {
    const subject = this.getMockSubjects().find(s => s.subjectId == subjectId);
    return of(subject);
  }

  deleteSubject(subjectId: string) {
    debugger;
    return this.http.delete(`/api/subject/${subjectId}`);
  }
  private getMockSubjects(): any[] {
    return [
      { subjectId: 1, name: 'Mathematics', className: '10th Grade', languages: ['English', 'Hindi'] },
      { subjectId: 2, name: 'Science', className: '9th Grade', languages: ['English'] },
      { subjectId: 3, name: 'History', className: '8th Grade', languages: ['English', 'French'] },
      { subjectId: 4, name: 'Geography', className: '7th Grade', languages: ['English', 'Spanish'] },
      { subjectId: 5, name: 'Physics', className: '12th Grade', languages: ['English', 'Hindi'] },
      { subjectId: 6, name: 'Chemistry', className: '11th Grade', languages: ['English'] },
      { subjectId: 7, name: 'Biology', className: '10th Grade', languages: ['English', 'Hindi'] },
      { subjectId: 8, name: 'Computer Science', className: '12th Grade', languages: ['English'] },
      { subjectId: 9, name: 'Economics', className: '11th Grade', languages: ['English', 'French'] },
      { subjectId: 10, name: 'Political Science', className: '10th Grade', languages: ['English', 'Spanish'] }
    ];
  }


}
