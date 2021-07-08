import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { DomainName } from "./../Uititlites/pathTools";
import { Observable } from "rxjs";

export class ShopInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //let MyRequset:HttpRequest<any> req
        let myRes=req.clone({
            url:DomainName+req.url
        });
        return next.handle(myRes);
    }

}