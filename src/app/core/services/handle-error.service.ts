import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

export class NotAuthenticatedError {
}

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private messageService: MessageService,
    private router: Router) {
  }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      if (errorResponse.error && errorResponse.error.error === 'invalid_grant') {
        msg = 'Endereço de e-mail ou senha incorretos';
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) {
      }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: 'Operação Cancelada!', detail: msg});
  }

}
