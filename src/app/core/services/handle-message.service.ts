import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HandleMessageService {

  constructor(private messageService: MessageService) {
  }

  onShowSuccess(message: string) {
    this.messageService.add({severity: 'success', summary: 'Operação concluída', detail: message});
  }

  onShowError(message: string) {
    this.messageService.add({severity: 'error', summary: 'Operação cancelada', detail: message});
  }

}
