import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { finalize, Observable } from "rxjs";
import { CustomloaderService } from "../../custom-loader/customloader.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  loaderService = inject(CustomloaderService)
  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned).pipe(
        finalize(() => {
          this.loaderService.hide()
        })
      );
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide()
      })
    );
  }
}
