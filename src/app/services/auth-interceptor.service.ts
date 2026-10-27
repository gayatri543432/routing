    import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
    import { inject,  Injectable } from "@angular/core";
    import { catchError, finalize, Observable, throwError } from "rxjs";
    import { SpinnerService } from "./spinner.service";

    @Injectable({
        providedIn:'root'
    })
    export class AuthInterceptor implements HttpInterceptor{
        private _spinnerSer =inject(SpinnerService)
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
               this._spinnerSer.show();
            const reqClone = req.clone(
                {
                    setHeaders:{
                    Auth:'Bearer Token'
                }
                })
            

            return next.handle(reqClone)
               
                 .pipe(

                    catchError((error: HttpErrorResponse) => {

                        return throwError(() => error);

                    }),

                    finalize(()=>{
                        this._spinnerSer.hide();

                    })
                )
        }

    }