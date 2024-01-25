import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogerService {

  constructor() { }

//   logger(message:string): boolean{

// console.log(message);
//     if(message==='test')
//     return true;
//   else
//   return false;
//   }
  
logger(message: string): Observable<boolean> {
  return new Observable<boolean>((observer) => {
    console.log(message);
    if (message === 'test') {
      observer.next(true);
    } else {
      observer.next(false);
    }
    observer.complete();
  });
}
}
