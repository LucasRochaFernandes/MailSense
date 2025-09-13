import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import {
  FileRemoveEvent,
  FileSelectEvent,
  FileUpload,
  FileUploadModule,
} from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MailSenseService } from './services/mailsense.service';
import { MessageService } from 'primeng/api';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TagModule,
    FileUploadModule,
    FormsModule,
    ToastModule,
  ],
  providers: [MessageService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: boolean = false;
  errorMessage: string | null = null;

  isCopied: boolean = false;

  emailContent: string | null = null;
  uploadedFile: File | null = null;

  category: string | null = null;
  categorySeverity: 'success' | 'info' | 'warn' | 'danger' | undefined;
  suggestedReply: string | null = null;

  constructor(
    private titleService: Title,
    private mailSenseService: MailSenseService,
    private messageService: MessageService // Injetar o MessageService
  ) {
    this.titleService.setTitle(
      'MailSense | Classificador Inteligente de Emails'
    );
  }

  onSelectFile(event: FileSelectEvent) {
    this.errorMessage = null;
    const fileSelected = event.files[0];
    if (!this.isFileValid(fileSelected)) {
      this.uploadedFile = null;
      return;
    }
    this.uploadedFile = fileSelected;
  }

  isFileValid(file: File): boolean {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowed = ['text/plain', 'application/pdf'];
    if (file && file.size > maxSize) {
      this.errorMessage = 'O arquivo deve ser menor que 10 MB.';
      return false;
    }
    if (
      file &&
      !allowed.includes(file.type) &&
      !file.name.match(/\.(txt|pdf)$/i)
    ) {
      this.errorMessage = 'Tipo de arquivo inválido. Use .txt ou .pdf';
      return false;
    }
    return true;
  }

  copyToClipboard(text: string | null) {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(text ?? '').then(() => {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.category = null;
    this.suggestedReply = null;
    if (
      (!this.uploadedFile && !this.emailContent) ||
      (this.emailContent && !this.emailContent.trim())
    ) {
      this.errorMessage = 'Insira texto ou envie um arquivo.';
      return;
    }
    this.loading = true;
    if (this.uploadedFile) {
      this.mailSenseService
        .classifyEmailFileContent(this.uploadedFile)
        .pipe(
          timeout(15000),
          catchError((err) => {
            this.handleErrorUnknown(err);
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (response) => {
            this.category = response.category;
            this.suggestedReply = response.reply;
            if (response.category.toLowerCase().trim() === 'produtivo') {
              this.categorySeverity = 'success';
            }
            if (response.category.toLowerCase().trim() === 'improdutivo') {
              this.categorySeverity = 'info';
            }
            this.loading = false;
          },
          error: (_) => {
            this.loading = false;
          },
        });
    } else {
      this.mailSenseService
        .classifyEmailContent(this.emailContent!)
        .pipe(
          timeout(15000),
          catchError((err) => {
            this.handleErrorUnknown(err);
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (response) => {
            this.category = response.category;
            this.suggestedReply = response.reply;
            if (response.category.toLowerCase().trim() === 'produtivo') {
              this.categorySeverity = 'success';
            }
            if (response.category.toLowerCase().trim() === 'improdutivo') {
              this.categorySeverity = 'info';
            }
            this.loading = false;
          },
          error: (_) => {
            this.loading = false;
          },
        });
    }
  }

  resetForm(fileUploadRef?: FileUpload) {
    this.uploadedFile = null;
    this.emailContent = null;
    this.category = null;
    this.suggestedReply = null;
    this.errorMessage = null;
    if (fileUploadRef && typeof fileUploadRef.clear === 'function') {
      fileUploadRef.clear(); // resets PrimeNG FileUpload UI
    }
  }
  onRemoveFile(_: FileRemoveEvent) {
    this.uploadedFile = null;
  }
  removeSelectedFile(fileUploadComponent: FileUpload) {
    this.uploadedFile = null;
    if (
      fileUploadComponent &&
      typeof fileUploadComponent.clear === 'function'
    ) {
      fileUploadComponent.clear();
    } else if (fileUploadComponent && fileUploadComponent.files) {
      fileUploadComponent.files = [];
    }
  }
  private handleErrorUnknown(_: Error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail:
        'Não foi possível processar o e-mail. Tente novamente mais tarde.',
    });
    this.loading = false;
  }
}
