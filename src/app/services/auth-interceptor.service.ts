    import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
    import { Injectable } from "@angular/core";
    import { finalize, Observable } from "rxjs";

    @Injectable({
        providedIn:'root'
    })
    export class AuthInterceptor implements HttpInterceptor{
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const reqClone = req.clone(
                {
                    setHeaders:{
                    Auth:'Bearer Token'
                }
                })
            

            return next.handle(reqClone)
                .pipe(
                    finalize(()=>{
                        
                    })
                )
        }

    }