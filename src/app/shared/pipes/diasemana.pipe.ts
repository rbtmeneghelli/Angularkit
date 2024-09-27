import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nomeDiaSemana'
})

export class DiaSemanaPipe implements PipeTransform {
    transform(value: number): string {
        // dictionary no frontend
    const dictionary: { [key: number]: string } = {
        [1]: 'Domingo',
        [2]: 'Segunda-feira',
        [3]: 'Terça-feira',
        [4]: 'Quarta-feira',
        [5]: 'Quinta-feira',
        [6]: 'Sexta-feira',
        [7]: 'Sabado',
    };
    return dictionary[value];
}