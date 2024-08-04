import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BmiService {
  private apiUrl = 'http://127.0.0.1:8000';  // Change this URL based on your FastAPI server configuration

  constructor(private http: HttpClient) { }

  predictBmi(area: number, bedrooms: number): Observable<any> {
    const url = `${this.apiUrl}/predictPrice?a=${area}&b=${bedrooms}`;
    return this.http.get(url);
  }
}
