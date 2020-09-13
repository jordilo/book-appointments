import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/definitions/user';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  public transform(value: User): string {
    return `${value.name} ${value.lastname}`;
  }

}
