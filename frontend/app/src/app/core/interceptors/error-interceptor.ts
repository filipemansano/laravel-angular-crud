import { AuthenticationService } from '@modules/auth/services/authetication.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor {

  constructor(
    private inject: Injector,
    private snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * waiting to complete PR
     * https://github.com/angular/angular/issues/18155
     *
     * after changes headers solution for map solution
     */
    if (request.headers.has('skip-error-interceptor')) {
      const headers = request.headers.delete('skip-error-interceptor');
      return next.handle(request.clone({ headers }));
    }

    return next.handle(request).pipe(

      catchError((err: HttpErrorResponse) => {

        // 401 - UNAUTHORIZED
        if (err.status === 401) {
          const authenticationService = this.inject.get(AuthenticationService);
          authenticationService.logout();
        }

        const message = err.error.message || err.message;

        this.snackBar.open(message, 'OK', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom'
        });


        return throwError(err);
      })
    );
  }
}
