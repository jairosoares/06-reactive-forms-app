import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  private readonly API_URL = 'your-api-url/users';

  constructor(private http: HttpClient) {}

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.get<boolean>(`${this.API_URL}/check-email/${email}`)
      );
      return response;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  }

}
