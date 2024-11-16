import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {


    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjYXJsb3NAZXhhbXBsZS5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzM0MzAyNzQ1fQ.CEq68DHjxLu6Ne5E6KCzlRO2wzx7bRdGsNPirUs3JuJQMVKOSUiLV7MXowcZwIAaYzzTbwIXa5IONEfLUp-dGg`),
    });
    return next(authReq);


  return next(req);
};
