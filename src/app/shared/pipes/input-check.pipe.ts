import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputCheck',
})
export class InputCheckPipe implements PipeTransform {
  transform(
    valor: string | Date | number,
    nomePipe: string,
    ...args: any[]
  ): string | Date | number {
    if (!!valor) {
      return this.resolverPipe(nomePipe, valor, args);
    } else {
      return '-';
    }
  }

  private resolverPipe(pipeName: string, valor: any, args: any[]): any {
    // Resolve o pipe pelo nome
    switch (pipeName) {
      case 'date':
        const pipeData = new DatePipe('en-US');
        return pipeData.transform(valor, ...args);
      case 'currency':
        const pipeMoeda = new CurrencyPipe('en-US');
        return pipeMoeda.transform(valor, ...args);
      default:
        return valor;
    }
  }
}