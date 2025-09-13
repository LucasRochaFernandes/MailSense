import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassificationResponse } from '../models/mailsense.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailSenseService {
  private readonly BASE_URL = environment.API_BASE_URL;
  constructor(private httpClient: HttpClient) {}

  classifyEmailFileContent(file: File): Observable<ClassificationResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<ClassificationResponse>(
      this.BASE_URL + '/classify-email-file-content',
      formData
    );
  }
  classifyEmailContent(content: string): Observable<ClassificationResponse> {
    const payload = { text: content.trim() };
    return this.httpClient.post<ClassificationResponse>(
      this.BASE_URL + '/classify-email-content',
      payload
    );
  }
}
