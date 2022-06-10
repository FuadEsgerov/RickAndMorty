import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  logError(message: string, stack: string): void {
    // Send errors to server here
    console.log('LoggingService: ' + message);
  }
}
