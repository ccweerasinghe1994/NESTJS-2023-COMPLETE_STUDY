import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptors implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before the request is handled by the request handler
    console.log('i am running before the handler', context);
    // Run something before a request is handled by the request handler
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        console.log('i am running before the response is sent out', data);
        return { data };
      }),
    );
  }
}
