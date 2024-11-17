// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDm } from '../models/DMs/user.dm';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../env/dev';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
  }

  signup(user: UserDm): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, user);
  }

  login(user: UserDm): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  getUserEmail(): string {
    // Implement a method to get the user's email from the token or user service
    return 'user@example.com';
  }
}
