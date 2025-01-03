import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('notifications') // Define a rota do evento que o controlador ouvirá
  handleNotification(@Payload() data: any) {

    try {

      // Verifica se a propriedade 'value' do objeto 'data' existe e não é nula ou indefinida.
      // Caso a propriedade 'value' esteja presente, o conteúdo de 'data.value' é convertido de JSON para um objeto JavaScript usando JSON.parse().
      // Caso contrário, a variável 'message' recebe o próprio objeto 'data', sem alterações.
      const message = data?.value ? JSON.parse(data.value) : data;

      if (message && message.type) {

        console.log('Notificação recebida:', message); // Log para depuração
        this.notificationService.processNotification(message); // Processa a notificação
      } else {

        console.error('Recebeu uma mensagem inválida:', data); // Mensagem inválida
      }
    } catch (error) {

      console.error('Erro ao processar a mensagem:', error.message, data); // Log de erro ao processar
    }
  }
}
