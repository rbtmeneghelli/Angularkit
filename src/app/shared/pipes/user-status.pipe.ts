import { Pipe, PipeTransform } from '@angular/core';
import { EnumUserStatus } from 'src/app/app_entities/enum/EnumUserStatus.model';

@Pipe({
    name: 'userStatus'
})

export class UserStatusPipe implements PipeTransform {
    transform(userStatus: number): string {
        // Dicionario do C# em TypeScript
        const userStatusDescription: { [key: number]: string } = {
            [EnumUserStatus.ATIVO]: 'Ativo',
            [EnumUserStatus.INATIVO]: 'Inativo',
        };
        return userStatusDescription[userStatus] ? userStatusDescription[userStatus] : 'Inválido';
    }
}
