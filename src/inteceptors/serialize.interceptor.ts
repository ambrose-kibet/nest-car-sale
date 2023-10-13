import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ClassConstructor, plainToClass } from 'class-transformer';

export function Serialize(dto: ClassConstructor<unknown>) {
  return UseInterceptors(new SerialIntercptor(dto));
}

export class SerialIntercptor implements NestInterceptor {
  constructor(private someDto: ClassConstructor<unknown>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.someDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
