import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(value: string[] | any[], property?: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!value) return [];
    
    const arrayCopy = [...value]; 

    return arrayCopy.sort((a, b) => {
      const valA = property ? a[property] : a;
      const valB = property ? b[property] : b;
      return order === 'asc' ? valA.localeCompare(valB, undefined, { sensitivity: 'base' }) : valB.localeCompare(valA, undefined, { sensitivity: 'base' });
    });
  }
}