import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nomeDiaSemana'
})

export class DiaSemanaPipe implements PipeTransform {
    transform(value: number): string {
        const mapa = new Map<number, string>();
        mapa.set(1, 'Domingo');
        mapa.set(2, 'Segunda-feira');
        mapa.set(3, 'Terça-feira');
        mapa.set(4, 'Quarta-feira');
        mapa.set(5, 'Quinta-feira');
        mapa.set(6, 'Sexta-feira');
        mapa.set(7, 'Sabado');
        return mapa.get(value);
    }
}